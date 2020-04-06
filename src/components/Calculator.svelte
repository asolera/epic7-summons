<script>
  export let goldTransmitStones;
  export let summonType = 'banner';
  export let currentSummons;
  let current = {
    gems: 0,
    bookmarks: 0
  };

  $: if (summonType == 'mystic') {
    current.gems = 0;
    currentSummons = Math.floor(current.bookmarks / 50);
  } else if (summonType == 'banner') {
    currentSummons = Math.floor(current.gems / 95) + Math.floor(current.bookmarks / 5);
    goldTransmitStones = Math.floor(currentSummons / 20);
  }

  $: if (isNaN(goldTransmitStones)) goldTransmitStones = 0
</script>

<style>
  input {
    color: #000;
    text-align: center;
  }

  input[type="number"]:disabled {
    background: gray;
  }
</style>

<div class="row">
  <form>
    <label>Type:</label>
    <input type="radio" bind:group={summonType} value="banner" />
      <span class="label-body">Banner</span>
    <input type="radio" bind:group={summonType} value="mystic" />
      <span class="label-body">Mystic</span>
    <label for="gems">Current Gems:</label>
    <input type=number min=0 max=99999 bind:value={current.gems} disabled={summonType == 'mystic'} />
    <label for="gems">Current Bookmarks:</label>
    <input type=number min=0 max=99999 bind:value={current.bookmarks} />
  </form>
</div>