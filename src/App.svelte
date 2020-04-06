<script>
  import Title from './components/Title.svelte';
  import Calculator from './components/Calculator.svelte';
  import Progress from './components/Progress.svelte';
  import GoldStones from './components/GoldStones.svelte';
  import Footer from './components/Footer.svelte';

  const version = '1.20.0406c';
  const title = 'Epic Seven Guaranteed Summon Calculator';
  const guaranteedSummons = 120;
  let summonType;
  let currentSummons;
  let goldTransmitStones;
  let currentSummonsPercentage = 0;

  $: if (isNaN(currentSummons)) currentSummons = 0
  $: currentSummonsPercentage = Math.floor(currentSummons / guaranteedSummons * 100);
</script>

<style>
  .main {
    margin-top: 5px;
    text-align: center;
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
</style>

<div class="container main">
  <Title {title} />

  <Calculator 
    bind:goldTransmitStones={goldTransmitStones} 
    bind:summonType={summonType}
    bind:currentSummons={currentSummons}
  />

  <Progress 
    currentValue={currentSummons}
    maxValue={guaranteedSummons}
    percentage={currentSummonsPercentage} 
  />

  {#if summonType == 'banner'}
    <GoldStones {goldTransmitStones} />
  {/if}

  <Footer {version} />

</div>