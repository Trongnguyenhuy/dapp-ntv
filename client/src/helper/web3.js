import Web3 from 'web3';

import Dappatoken from './artifacts/contracts/Dapptoken.sol/Dappatoken.json'
import Redapptoken from './artifacts/contracts/Retoken.sol/Redapptoken.json'
import TokenFarm from './artifacts/contracts/Farm.sol/TokenFarm.json'

export let web3 = new Web3(window.ethereum);

export const getWeb3 = async () =>{
    return new Promise((resolve, reject) =>{

        if(window.ethereum){
            web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(() => {
                    console.log('Allowed');
                    resolve(web3);
                })
            } catch (e) {
                console.error('ERROR', e);
                reject(e);
            }
        }

        else if(window.web3){
            web3 = new Web3(window.web3.currentProvider);
            resolve(web3);
        }

        else{
            reject('you have not install MetaMask ');
        }
    });
}

export function fromWei(token) {
    const web3 = new Web3(window.ethereum);

    if(!web3?.utils){
        return 0;
    }
    return web3.utils.fromWei(token.toString());
}

export function toWei(token){
    const web3 = new Web3(window.ethereum);

    if(!web3?.utils){
        return 0;
    }
    return web3.utils.toWei(token.toString());
}

export const fetchToken = async (account, setState ={}) => {
    const web3 = new Web3(window.ethereum);

    //dedugger
    const result = {
        account: account,
        reToken: {},
        dappToken: {},
        tokenFarm: {},
        reTokenBalance: 0,
        dappTokenBalance: 0,
        tokenFarmBalance: 0,
        isLoading: false
    }

    const reToken = Redapptoken.networks[networkID]
    if(reToken){
        const reToken = new web3.eth.Contract(Redapptoken.abi, reToken.address)
        const reTokenBalance = await reToken.methods.balanceOf(account).call();

        result.reToken = reToken;
        result.reTokenBalance = reTokenBalance;
        window.reToken = reToken; // LUU Y
    }
    else{
        alert('Con not find retoken contract')
    }

    const dappTokenData = Dappatoken.networks[networkID];
    if(dappTokenData){
        const dappToken = new web3.eth.Contract(Dappatoken.abi, dappTokenData.address);
        const dappTokenBalance = await dappToken.methods.balanceOf(account).call();

        result.dappToken = dappToken;
        result.dappTokenBalance = dappTokenBalance;
    } else {
        alert('Con not find dapptoken contract')
    }

    const tokenFarmData = TokenFarm.networks[networkID];
    if(tokenFarmData){
        const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
        const tokenFarmBalance = await tokenFarm.methods.stakingBalance(account).call();

        result.tokenFarm = tokenFarm;
        result.tokenFarmBalance = tokenFarmBalance;
    } else{
        alert('Con not find dapptoken contract')
    }

    return result;
}