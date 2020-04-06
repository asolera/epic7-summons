<script>
  let current = {
    gems: 0,
    bookmarks: 0
  };
  let currentSummons;
  let goldTransmitStones;
  let currentSummonsPercentage = 0;
  let summonType = 'banner';
  let guaranteedSummons = 120;
  $: if (summonType == 'mystic') {
    current.gems = 0;
    currentSummons = Math.floor(current.bookmarks / 50);
  } else if (summonType == 'banner') {
    currentSummons = Math.floor(current.gems / 95) + Math.floor(current.bookmarks / 5);
    goldTransmitStones = Math.floor(currentSummons / 20);
  }
  $: if (isNaN(currentSummons)) currentSummons = 0
  $: if (isNaN(goldTransmitStones)) goldTransmitStones = 0
</script>

<style>
  .main {
    margin-top: 5px;
    text-align: center;
  }

  input {
    text-align: center;
  }

  input[type="text"]:disabled {
    background: #dddddd;
  }

</style>

<div class="container main">
  <div class="row">
    <h2 class="hero-heading">Epic Seven Guaranteed Summon Calculator</h2>
  </div>

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

  <div>{currentSummons} of {guaranteedSummons} summons ({currentSummonsPercentage}%)</div>

  <div>
    <label for="summonProgress">Progress:</label>
    <progress id="summonProgress" value="{currentSummons || 0}" max="{guaranteedSummons}"> {currentSummonsPercentage}% </progress>
  </div>

  {#if summonType == 'banner'}
    <label for="goldStones"></label>
    <div id="goldStones">{goldTransmitStones} Gold Transmit Stones</div>
  {/if}

</div>