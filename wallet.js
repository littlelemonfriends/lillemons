const Web3Modal = window.Web3Modal.default;

Notiflix.Notify.init({
	position: 'right-bottom',
})

let web3, provider, selectedAccount, accountData, contract;
let supplyInterval, supplyElement;

const providerOptions = {
	walletconnect: {
		package: window.WalletConnectProvider.default,
		options: {
			infuraId: "24fc637f581e49f7815d171634002d2d",
		}
	},
};

const web3Modal = new Web3Modal({
	network: "mainnet", // optional
	cacheProvider: false, // optional
	providerOptions,
	disableInjectedProvider: false,
});

let getAccountData = async () => {
	const chainId = await web3.eth.getChainId()
	const chainData = evmChains.getChain(chainId)
	const accounts = await web3.eth.getAccounts()
	selectedAccount = accounts[0]
	const bal = await web3.eth.getBalance(selectedAccount)
	const eth_bal = web3.utils.fromWei(bal, "ether")
	const human_bal = parseFloat(eth_bal).toFixed(4)
	return { account: selectedAccount, balance: bal, eth_balance: eth_bal, human_balance: human_bal, chain_id: chainId }
}

let verifySetup = async () => {
	console.log(accountData.chain_id, config)
	if(accountData.chain_id != config.requirements.chain_id) {
		Notiflix.Notify.failure('Wrong Chain ID! Switch to ETH Mainnet.');
	}
}

let connectWallet = async () => {
	try {
		provider = await web3Modal.connect();
		web3 = new Web3(provider)
		contract = new web3.eth.Contract(abi, config.contract.contract_address)
		getTotalSupplyInterval()
		supplyInterval = setInterval(getTotalSupplyInterval, 10000)
	} catch(e) {
		console.log(e)
		if(e) Notiflix.Notify.failure(e);
		//return
	}
	accountData = await getAccountData()
	await verifySetup()
	console.log(accountData)
	let onWhitelist = await checkIsOnWhitelist()
	let onCollection = await checkIsOnCollection()
	if(!onCollection) {
		document.querySelector('.btn-collection').classList.remove('btn-enable')
		document.querySelector('.btn-collection').classList.add('btn-disable')
		//Notiflix.Notify.failure('You are not on the presale whitelist!');
	}
	if(!onWhitelist) {
		document.querySelector('.btn-presale').classList.remove('btn-enable')
		document.querySelector('.btn-presale').classList.add('btn-disable')
		Notiflix.Notify.failure('You are not on the presale whitelist!');
	}

	provider.on("accountsChanged", async (accounts) => {
		if(accounts.length == 0) return;
		accountData = await getAccountData()
		await verifySetup()
		console.log(accountData)
		let onWhitelist = await checkIsOnWhitelist()
		let onCollection = await checkIsOnCollection()
		if(!onCollection) {
			document.querySelector('.btn-collection').classList.remove('btn-enable')
			document.querySelector('.btn-collection').classList.add('btn-disable')
			//Notiflix.Notify.failure('You are not on the presale whitelist!');
		}
		if(!onWhitelist) {
			document.querySelector('.btn-presale').classList.remove('btn-enable')
			document.querySelector('.btn-presale').classList.add('btn-disable')
			Notiflix.Notify.failure('You are not on the presale whitelist!');
		}
	})
	provider.on("chainChanged", async (accounts) => {
		if(accounts.length == 0) return;
		accountData = await getAccountData()
		await verifySetup()
		console.log(accountData)
		let onWhitelist = await checkIsOnWhitelist()
		let onCollection = await checkIsOnCollection()
		if(!onCollection) {
			document.querySelector('.btn-collection').classList.remove('btn-enable')
			document.querySelector('.btn-collection').classList.add('btn-disable')
			//Notiflix.Notify.failure('You are not on the presale whitelist!');
		}
		if(!onWhitelist) {
			document.querySelector('.btn-presale').classList.remove('btn-enable')
			document.querySelector('.btn-presale').classList.add('btn-disable')
			Notiflix.Notify.failure('You are not on the presale whitelist!');
		}
	})
	Notiflix.Notify.success('Connected Wallet');
}

let total_amt;
let supplies = []
let getTotalSupplyInterval = async () => {
	supplies.forEach(async (s) => {
		if(!contract) return;
		let res;
		try {
			res = await contract.methods[s.supply_func]().call()
		} catch(e) {
			return
		}
		if(res) {
			console.log('total supply', res)
			if(s.element) { 
				console.log(total_amt)
				let amt_left = s.total_amt - res
				if(s.total_amt) {
					s.element.innerText = `${res} / ${s.total_amt}`
					//s.element.innerText = `${amt_left} left`
				} else {
					s.element.innerText = `Amount minted: ${res}`
				}
			}
		}
	})
}

mintIsActive = false
let getIsMintActive = async () => {
	if(!contract) return;
	let res;
	try {
		res = await contract.methods.mintIsActive().call()
		mintIsActive = res
		return res
	} catch(e) {
		console.log(e)
	}
}

let getIsPresaleActive = async () => {
	if(!contract) return;
	let res;
	try {
		res = await contract.methods.presaleIsActive().call()
		mintIsActive = res
		return res
	} catch(e) {
		console.log(e)
	}
}

let checkIsOnWhitelist = async () => {
	let res = await contract.methods['presaleWalletList'](accountData.account).call()
	//let res = await contract.methods['presaleWalletList']('0x08c3d4a4fe4e28f4ea0402fccf35d5b81e8f1ec8').call()
	console.log(res)
	return res
}

let checkIsOnCollection = async () => {
	return true
	try {
		//let res = await contract.methods['qualifyForCollectionPresaleMint'](accountData.account).call()
		//let res = await contract.methods['qualifyForCollectionPresaleMint']('0xE83662f74a5961436490cc88417a107CF06a175a').call()
		console.log(res)
		return res
	} catch(e) {
	}
}

let checkGasEstimateAndErrors = async (func, params, obj) => {
	let error = null
	if(!params) {
		console.log(func, params, obj)
		try {
			await contract.methods[func]().estimateGas(obj, (err, res) => {
				console.log(err)
				console.log(res)
				if(err) {
					error = err
				}
			})
		} catch(e) {
			return error
		}
	} else {
		try {
			await contract.methods[func](params).estimateGas(obj, (err, res) => {
				console.log(err)
				console.log(res)
				if(err) {
					error = err
				}
			})
		} catch(e) {
			return error
		}
	}
}

let getIsQualifiedForPresale = async () => {
	//const result = await contract.methods.presaleWalletList("0x478ae6424c67C268744306af037Dbb1eDeD5461A").call()
	const result = await contract.methods.presaleWalletList(accountData.account).call()
	console.log(result)
	if (result > 0) {
		return result
	}
	return false
}

let registerSupplyElement = async (element, total_amt_, supplyFunc) => {
	console.log(total_amt)
	supplyElement = element
	total_amt = total_amt_
	supplies.push({ element: element, total_amt: total_amt_, supply_func: supplyFunc })
	//getTotalSupplyInterval(element, total_amt_, supplyFunc)
}

let registerConnectButton = async (element) => {
	element.addEventListener('click', connectWallet)
}

let registerMintButton = async (element, amt_element, mintFunc, price) => {
	console.log('clicked')
	element.addEventListener('click', async () => {
		console.log('clicked')
		let err = false
		if(!amt_element) {
			console.log(amt_element)
			err = await checkGasEstimateAndErrors(mintFunc, false, { from: accountData.account, value: price })
		} else {
			err = await checkGasEstimateAndErrors(mintFunc, amt_element(), { from: accountData.account, value: amt_element() * price })
		}
		if(err) { Notiflix.Notify.failure(err.message.split(':')[1].split("{")[0]); return }
		/*let isMintActive = await getIsMintActive()
		console.log(isMintActive)
		if(!isMintActive) {
			Notiflix.Notify.failure("Mint is not active yet!")
			return
		}*/
		await contract.methods[mintFunc](amt_element()).send({
		//await contract.methods[mintFunc]().send({
			from: accountData.account,
			value: amt_element() * price
		})
			.on('transactionHash', (hash) => {
				Notiflix.Notify.success("Transaction Sent!");
			})
			.on('confirmed', (receipt) => {
				Notiflix.Notify.success("Transaction Confirmed!");
			})
			.on('error', (error, receipt) => {
				Notiflix.Notify.failure(error.message);
			})
	})
}

let registerContractButton = async (element, address, abi, method, params, cb) => {
	element.addEventListener('click', async () => {
		params = params || null;
		console.log(params.value)
		let contract = new web3.eth.Contract(abi, address)
		let res = await contract.methods[method]().call()
		console.log(res)
		if(cb) { return cb(res) }
	});
	//element.addEventListener('click', connectWallet)
}

window.addEventListener('load', connectWallet)
