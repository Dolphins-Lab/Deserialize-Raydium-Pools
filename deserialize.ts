import {
  liquidityStateV4Layout,
  publicKey,
  Raydium,
} from "@raydium-io/raydium-sdk-v2";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";

class RaydiumPool {
  // Insert liquidity pool address here
  static liquidityPoolAddress = new PublicKey(
    "DXE6eQFuBYF6KG4vpQYRyeQJWi12ynQpZNYY75gwGDsu"
  );

  static poolSchemaV4 = liquidityStateV4Layout;

  static async startNewConnectionToRaydium() {
    const keypair = Keypair.generate();
    if (!keypair) {
      return;
    }

    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const owner = keypair.publicKey;

    const raydium = await Raydium.load({
      connection,
      owner,
      disableLoadToken: false,
    });

    await RaydiumPool.printPoolRpcInfo(raydium);
  }

  static async printPoolRpcInfo(raydium: any) {
    const poolRpcInfo = await raydium.liquidity.getRpcPoolInfo(
      RaydiumPool.liquidityPoolAddress.toBase58()
    );
    const readableRpcInfo = RaydiumPool.formatReadableRpcInfo(poolRpcInfo);

    console.log("Pool RPC Info", readableRpcInfo);
  }

  static formatReadableRpcInfo(poolRpcInfo: any) {
    return {
      status: poolRpcInfo.status.toNumber(),
      nonce: poolRpcInfo.nonce.toNumber(),
      maxOrder: poolRpcInfo.maxOrder.toNumber(),
      depth: poolRpcInfo.depth.toNumber(),
      baseDecimal: poolRpcInfo.baseDecimal.toNumber(),
      quoteDecimal: poolRpcInfo.quoteDecimal.toNumber(),
      state: poolRpcInfo.state.toNumber(),
      resetFlag: poolRpcInfo.resetFlag.toNumber(),
      minSize: poolRpcInfo.minSize.toString(),
      volMaxCutRatio: poolRpcInfo.volMaxCutRatio.toString(),
      amountWaveRatio: poolRpcInfo.amountWaveRatio.toString(),
      baseLotSize: poolRpcInfo.baseLotSize.toString(),
      quoteLotSize: poolRpcInfo.quoteLotSize.toString(),
      minPriceMultiplier: poolRpcInfo.minPriceMultiplier.toString(),
      maxPriceMultiplier: poolRpcInfo.maxPriceMultiplier.toString(),
      systemDecimalValue: poolRpcInfo.systemDecimalValue.toString(),
      minSeparateNumerator: poolRpcInfo.minSeparateNumerator.toNumber(),
      minSeparateDenominator: poolRpcInfo.minSeparateDenominator.toNumber(),
      tradeFeeNumerator: poolRpcInfo.tradeFeeNumerator.toNumber(),
      tradeFeeDenominator: poolRpcInfo.tradeFeeDenominator.toNumber(),
      pnlNumerator: poolRpcInfo.pnlNumerator.toNumber(),
      pnlDenominator: poolRpcInfo.pnlDenominator.toNumber(),
      swapFeeNumerator: poolRpcInfo.swapFeeNumerator.toNumber(),
      swapFeeDenominator: poolRpcInfo.swapFeeDenominator.toNumber(),
      baseNeedTakePnl: poolRpcInfo.baseNeedTakePnl.toString(),
      quoteNeedTakePnl: poolRpcInfo.quoteNeedTakePnl.toString(),
      quoteTotalPnl: poolRpcInfo.quoteTotalPnl.toString(),
      baseTotalPnl: poolRpcInfo.baseTotalPnl.toString(),
      poolOpenTime: poolRpcInfo.poolOpenTime.toNumber(),
      punishPcAmount: poolRpcInfo.punishPcAmount.toString(),
      punishCoinAmount: poolRpcInfo.punishCoinAmount.toString(),
      orderbookToInitTime: poolRpcInfo.orderbookToInitTime.toString(),
      swapBaseInAmount: poolRpcInfo.swapBaseInAmount.toString(),
      swapQuoteOutAmount: poolRpcInfo.swapQuoteOutAmount.toString(),
      swapBase2QuoteFee: poolRpcInfo.swapBase2QuoteFee.toString(),
      swapQuoteInAmount: poolRpcInfo.swapQuoteInAmount.toString(),
      swapBaseOutAmount: poolRpcInfo.swapBaseOutAmount.toString(),
      swapQuote2BaseFee: poolRpcInfo.swapQuote2BaseFee.toString(),
      baseVault: poolRpcInfo.baseVault.toBase58(),
      quoteVault: poolRpcInfo.quoteVault.toBase58(),
      baseMint: poolRpcInfo.baseMint.toBase58(),
      quoteMint: poolRpcInfo.quoteMint.toBase58(),
      lpMint: poolRpcInfo.lpMint.toBase58(),
      openOrders: poolRpcInfo.openOrders.toBase58(),
      marketId: poolRpcInfo.marketId.toBase58(),
      marketProgramId: poolRpcInfo.marketProgramId.toBase58(),
      targetOrders: poolRpcInfo.targetOrders.toBase58(),
      withdrawQueue: poolRpcInfo.withdrawQueue.toBase58(),
      lpVault: poolRpcInfo.lpVault.toBase58(),
      owner: poolRpcInfo.owner.toBase58(),
      lpReserve: poolRpcInfo.lpReserve.toString(),
      padding: poolRpcInfo.padding.map((bn: any) => bn.toString()),
      baseReserve: poolRpcInfo.baseReserve.toString(),
      quoteReserve: poolRpcInfo.quoteReserve.toString(),
      poolPrice: poolRpcInfo.poolPrice.toString(),
    };
  }
}

RaydiumPool.startNewConnectionToRaydium();
