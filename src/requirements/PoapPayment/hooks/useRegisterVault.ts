import { parseUnits } from "@ethersproject/units"
import { useWeb3React } from "@web3-react/core"
import { useCreatePoapContext } from "components/[guild]/CreatePoap/components/CreatePoapContext"
import { Chains } from "connectors"
import useFeeCollectorContract from "hooks/useFeeCollectorContract"
import useShowErrorToast from "hooks/useShowErrorToast"
import useSubmit from "hooks/useSubmit"
import { TokenApiURLs } from "hooks/useTokens"
import fetcher from "utils/fetcher"

type RegisterVaultParams = {
  owner: string
  token: string
  fee: number
}

const useRegisterVault = (onSuccess: (vaultId: number) => void) => {
  const showErrorToast = useShowErrorToast()

  const { poapData } = useCreatePoapContext()

  const { chainId } = useWeb3React()
  const feeCollectorContract = useFeeCollectorContract()

  const registerVault = async (data: RegisterVaultParams) => {
    const { owner, token, fee } = data

    const tokensFromJSON = await fetcher(TokenApiURLs[Chains[chainId]][0])
    const tokenDataFromJSON = tokensFromJSON?.tokens?.find(
      (t) => t.address.toLowerCase() === token.toLowerCase()
    )
    const tokenData = await fetcher(`/util/symbol/${token}/${Chains[chainId]}`)
    const feeInWei = parseUnits(
      fee?.toString(),
      tokenDataFromJSON?.decimals ?? tokenData?.decimals ?? 18
    )
    console.log(poapData, feeInWei)

    const registerVaultCall = await feeCollectorContract.registerVault(
      poapData?.id,
      owner,
      token,
      feeInWei
    )
    const registeredVault = await registerVaultCall?.wait()
    const rawVaultId = registeredVault?.events?.find(
      (e) => e.event === "VaultRegistered"
    )?.args?.[0]

    if (!rawVaultId)
      return Promise.reject("Vault registration error - couldn't find vault ID")

    const vaultId = parseInt(rawVaultId.toString())
    return vaultId
  }

  return useSubmit<RegisterVaultParams, any>(registerVault, {
    onError: (error) => showErrorToast(error?.message ?? error),
    onSuccess,
  })
}

export default useRegisterVault