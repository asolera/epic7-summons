
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? undefined : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.20.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\App.svelte generated by Svelte v3.20.1 */

    const file = "src\\App.svelte";

    // (107:2) {#if summonType == 'banner'}
    function create_if_block(ctx) {
    	let label;
    	let t0;
    	let div;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			label = element("label");
    			t0 = space();
    			div = element("div");
    			t1 = text(/*goldTransmitStones*/ ctx[2]);
    			t2 = text(" Gold Transmit Stones");
    			attr_dev(label, "for", "goldStones");
    			add_location(label, file, 107, 4, 2587);
    			attr_dev(div, "class", "gold svelte-1dxxgjt");
    			attr_dev(div, "id", "goldStones");
    			add_location(div, file, 108, 4, 2624);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*goldTransmitStones*/ 4) set_data_dev(t1, /*goldTransmitStones*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(107:2) {#if summonType == 'banner'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div5;
    	let div0;
    	let h4;
    	let t1;
    	let div1;
    	let form;
    	let label0;
    	let t3;
    	let input0;
    	let t4;
    	let span0;
    	let t6;
    	let input1;
    	let t7;
    	let span1;
    	let t9;
    	let label1;
    	let t11;
    	let input2;
    	let input2_disabled_value;
    	let input2_updating = false;
    	let t12;
    	let label2;
    	let t14;
    	let input3;
    	let input3_updating = false;
    	let t15;
    	let div2;
    	let t16;
    	let t17;
    	let t18;
    	let t19;
    	let t20;
    	let t21;
    	let t22;
    	let div3;
    	let label3;
    	let t24;
    	let progress;
    	let t25;
    	let t26;
    	let progress_value_value;
    	let t27;
    	let t28;
    	let div4;
    	let dispose;

    	function input2_input_handler() {
    		input2_updating = true;
    		/*input2_input_handler*/ ctx[9].call(input2);
    	}

    	function input3_input_handler() {
    		input3_updating = true;
    		/*input3_input_handler*/ ctx[10].call(input3);
    	}

    	let if_block = /*summonType*/ ctx[3] == "banner" && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			h4 = element("h4");
    			h4.textContent = "Epic Seven Guaranteed Summon Calculator";
    			t1 = space();
    			div1 = element("div");
    			form = element("form");
    			label0 = element("label");
    			label0.textContent = "Type:";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			span0 = element("span");
    			span0.textContent = "Banner";
    			t6 = space();
    			input1 = element("input");
    			t7 = space();
    			span1 = element("span");
    			span1.textContent = "Mystic";
    			t9 = space();
    			label1 = element("label");
    			label1.textContent = "Current Gems:";
    			t11 = space();
    			input2 = element("input");
    			t12 = space();
    			label2 = element("label");
    			label2.textContent = "Current Bookmarks:";
    			t14 = space();
    			input3 = element("input");
    			t15 = space();
    			div2 = element("div");
    			t16 = text(/*currentSummons*/ ctx[1]);
    			t17 = text(" of ");
    			t18 = text(/*guaranteedSummons*/ ctx[5]);
    			t19 = text(" summons (");
    			t20 = text(/*currentSummonsPercentage*/ ctx[4]);
    			t21 = text("%)");
    			t22 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Progress:";
    			t24 = space();
    			progress = element("progress");
    			t25 = text(/*currentSummonsPercentage*/ ctx[4]);
    			t26 = text("%");
    			t27 = space();
    			if (if_block) if_block.c();
    			t28 = space();
    			div4 = element("div");
    			div4.textContent = "Made by Solera - Version 1.20.0406aa";
    			attr_dev(h4, "class", "hero-heading title svelte-1dxxgjt");
    			add_location(h4, file, 82, 4, 1573);
    			attr_dev(div0, "class", "row");
    			add_location(div0, file, 81, 2, 1551);
    			add_location(label0, file, 87, 6, 1696);
    			attr_dev(input0, "type", "radio");
    			input0.__value = "banner";
    			input0.value = input0.__value;
    			attr_dev(input0, "class", "svelte-1dxxgjt");
    			/*$$binding_groups*/ ctx[7][0].push(input0);
    			add_location(input0, file, 88, 6, 1723);
    			attr_dev(span0, "class", "label-body");
    			add_location(span0, file, 89, 8, 1793);
    			attr_dev(input1, "type", "radio");
    			input1.__value = "mystic";
    			input1.value = input1.__value;
    			attr_dev(input1, "class", "svelte-1dxxgjt");
    			/*$$binding_groups*/ ctx[7][0].push(input1);
    			add_location(input1, file, 90, 6, 1838);
    			attr_dev(span1, "class", "label-body");
    			add_location(span1, file, 91, 8, 1908);
    			attr_dev(label1, "for", "gems");
    			add_location(label1, file, 92, 6, 1953);
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "min", "0");
    			attr_dev(input2, "max", "99999");
    			input2.disabled = input2_disabled_value = /*summonType*/ ctx[3] == "mystic";
    			attr_dev(input2, "class", "svelte-1dxxgjt");
    			add_location(input2, file, 93, 6, 1999);
    			attr_dev(label2, "for", "gems");
    			add_location(label2, file, 94, 6, 2103);
    			attr_dev(input3, "type", "number");
    			attr_dev(input3, "min", "0");
    			attr_dev(input3, "max", "99999");
    			attr_dev(input3, "class", "svelte-1dxxgjt");
    			add_location(input3, file, 95, 6, 2154);
    			add_location(form, file, 86, 4, 1683);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file, 85, 2, 1661);
    			attr_dev(div2, "class", "summons svelte-1dxxgjt");
    			add_location(div2, file, 99, 2, 2247);
    			attr_dev(label3, "for", "summonProgress");
    			add_location(label3, file, 102, 4, 2365);
    			attr_dev(progress, "id", "summonProgress");
    			progress.value = progress_value_value = /*currentSummons*/ ctx[1] || 0;
    			attr_dev(progress, "max", /*guaranteedSummons*/ ctx[5]);
    			add_location(progress, file, 103, 4, 2415);
    			add_location(div3, file, 101, 2, 2355);
    			attr_dev(div4, "class", "version svelte-1dxxgjt");
    			add_location(div4, file, 111, 2, 2717);
    			attr_dev(div5, "class", "container main svelte-1dxxgjt");
    			add_location(div5, file, 80, 0, 1520);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, h4);
    			append_dev(div5, t1);
    			append_dev(div5, div1);
    			append_dev(div1, form);
    			append_dev(form, label0);
    			append_dev(form, t3);
    			append_dev(form, input0);
    			input0.checked = input0.__value === /*summonType*/ ctx[3];
    			append_dev(form, t4);
    			append_dev(form, span0);
    			append_dev(form, t6);
    			append_dev(form, input1);
    			input1.checked = input1.__value === /*summonType*/ ctx[3];
    			append_dev(form, t7);
    			append_dev(form, span1);
    			append_dev(form, t9);
    			append_dev(form, label1);
    			append_dev(form, t11);
    			append_dev(form, input2);
    			set_input_value(input2, /*current*/ ctx[0].gems);
    			append_dev(form, t12);
    			append_dev(form, label2);
    			append_dev(form, t14);
    			append_dev(form, input3);
    			set_input_value(input3, /*current*/ ctx[0].bookmarks);
    			append_dev(div5, t15);
    			append_dev(div5, div2);
    			append_dev(div2, t16);
    			append_dev(div2, t17);
    			append_dev(div2, t18);
    			append_dev(div2, t19);
    			append_dev(div2, t20);
    			append_dev(div2, t21);
    			append_dev(div5, t22);
    			append_dev(div5, div3);
    			append_dev(div3, label3);
    			append_dev(div3, t24);
    			append_dev(div3, progress);
    			append_dev(progress, t25);
    			append_dev(progress, t26);
    			append_dev(div5, t27);
    			if (if_block) if_block.m(div5, null);
    			append_dev(div5, t28);
    			append_dev(div5, div4);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "change", /*input0_change_handler*/ ctx[6]),
    				listen_dev(input1, "change", /*input1_change_handler*/ ctx[8]),
    				listen_dev(input2, "input", input2_input_handler),
    				listen_dev(input3, "input", input3_input_handler)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*summonType*/ 8) {
    				input0.checked = input0.__value === /*summonType*/ ctx[3];
    			}

    			if (dirty & /*summonType*/ 8) {
    				input1.checked = input1.__value === /*summonType*/ ctx[3];
    			}

    			if (dirty & /*summonType*/ 8 && input2_disabled_value !== (input2_disabled_value = /*summonType*/ ctx[3] == "mystic")) {
    				prop_dev(input2, "disabled", input2_disabled_value);
    			}

    			if (!input2_updating && dirty & /*current*/ 1) {
    				set_input_value(input2, /*current*/ ctx[0].gems);
    			}

    			input2_updating = false;

    			if (!input3_updating && dirty & /*current*/ 1) {
    				set_input_value(input3, /*current*/ ctx[0].bookmarks);
    			}

    			input3_updating = false;
    			if (dirty & /*currentSummons*/ 2) set_data_dev(t16, /*currentSummons*/ ctx[1]);

    			if (dirty & /*currentSummons*/ 2 && progress_value_value !== (progress_value_value = /*currentSummons*/ ctx[1] || 0)) {
    				prop_dev(progress, "value", progress_value_value);
    			}

    			if (/*summonType*/ ctx[3] == "banner") {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div5, t28);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			/*$$binding_groups*/ ctx[7][0].splice(/*$$binding_groups*/ ctx[7][0].indexOf(input0), 1);
    			/*$$binding_groups*/ ctx[7][0].splice(/*$$binding_groups*/ ctx[7][0].indexOf(input1), 1);
    			if (if_block) if_block.d();
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let current = { gems: 0, bookmarks: 0 };
    	let currentSummons;
    	let goldTransmitStones;
    	let currentSummonsPercentage = 0;
    	let summonType = "banner";
    	let guaranteedSummons = 120;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	const $$binding_groups = [[]];

    	function input0_change_handler() {
    		summonType = this.__value;
    		$$invalidate(3, summonType);
    	}

    	function input1_change_handler() {
    		summonType = this.__value;
    		$$invalidate(3, summonType);
    	}

    	function input2_input_handler() {
    		current.gems = to_number(this.value);
    		(($$invalidate(0, current), $$invalidate(3, summonType)), $$invalidate(1, currentSummons));
    	}

    	function input3_input_handler() {
    		current.bookmarks = to_number(this.value);
    		(($$invalidate(0, current), $$invalidate(3, summonType)), $$invalidate(1, currentSummons));
    	}

    	$$self.$capture_state = () => ({
    		current,
    		currentSummons,
    		goldTransmitStones,
    		currentSummonsPercentage,
    		summonType,
    		guaranteedSummons
    	});

    	$$self.$inject_state = $$props => {
    		if ("current" in $$props) $$invalidate(0, current = $$props.current);
    		if ("currentSummons" in $$props) $$invalidate(1, currentSummons = $$props.currentSummons);
    		if ("goldTransmitStones" in $$props) $$invalidate(2, goldTransmitStones = $$props.goldTransmitStones);
    		if ("currentSummonsPercentage" in $$props) $$invalidate(4, currentSummonsPercentage = $$props.currentSummonsPercentage);
    		if ("summonType" in $$props) $$invalidate(3, summonType = $$props.summonType);
    		if ("guaranteedSummons" in $$props) $$invalidate(5, guaranteedSummons = $$props.guaranteedSummons);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*summonType, current, currentSummons*/ 11) {
    			 if (summonType == "mystic") {
    				$$invalidate(0, current.gems = 0, current);
    				$$invalidate(1, currentSummons = Math.floor(current.bookmarks / 50));
    			} else if (summonType == "banner") {
    				$$invalidate(1, currentSummons = Math.floor(current.gems / 95) + Math.floor(current.bookmarks / 5));
    				$$invalidate(2, goldTransmitStones = Math.floor(currentSummons / 20));
    			}
    		}

    		if ($$self.$$.dirty & /*currentSummons*/ 2) {
    			 if (isNaN(currentSummons)) $$invalidate(1, currentSummons = 0);
    		}

    		if ($$self.$$.dirty & /*goldTransmitStones*/ 4) {
    			 if (isNaN(goldTransmitStones)) $$invalidate(2, goldTransmitStones = 0);
    		}
    	};

    	return [
    		current,
    		currentSummons,
    		goldTransmitStones,
    		summonType,
    		currentSummonsPercentage,
    		guaranteedSummons,
    		input0_change_handler,
    		$$binding_groups,
    		input1_change_handler,
    		input2_input_handler,
    		input3_input_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
