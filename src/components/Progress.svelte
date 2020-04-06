<script>
    export let currentValue;
    export let maxValue;
    export let percentage;
</script>

<style>
    .summons {
        color: #9CDCFE;
        font-weight: bold;
    }
</style>

<div class="summons">{currentValue} of {maxValue} summons ({percentage}%)</div>

<div>
    <label for="summonProgress">Progress:</label>
    <progress id="summonProgress" value="{currentValue || 0}" max="{maxValue}"> {percentage}% </progress>
</div>