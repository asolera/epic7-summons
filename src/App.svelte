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

  :global(body) {
    background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0.52), #000),
      url("background.jpg");
    background-repeat: no-repeat, no-repeat;
    background-color: #000;
    background-size: cover, cover;
  }

  :global(html) {
    height: 100%;
  }

  .container {
    background-color: #1E1E1E;
    opacity: 70%;
    color: #ccc;
    border-radius: 25px;
    padding: 10px;
  }

  .gold {
    color: #BFAB77;
    font-weight: bold;
  }

  .summons {
    color: #9CDCFE;
    font-weight: bold;
  }

  .container input {
    color: #000;
  }

  .title {
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

</style>

<div class="container main">
  <div class="row">
    <h4 class="hero-heading title">Epic Seven Guaranteed Summon Calculator</h4>
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

  <div class="summons">{currentSummons} of {guaranteedSummons} summons ({currentSummonsPercentage}%)</div>

  <div>
    <label for="summonProgress">Progress:</label>
    <progress id="summonProgress" value="{currentSummons || 0}" max="{guaranteedSummons}"> {currentSummonsPercentage}% </progress>
  </div>

  {#if summonType == 'banner'}
    <label for="goldStones"></label>
    <div class="gold" id="goldStones">{goldTransmitStones} Gold Transmit Stones</div>
  {/if}

</div>