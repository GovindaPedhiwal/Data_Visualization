import React, { useEffect, useState } from 'react'
import './Home.css'
import WineData from '../../data/Wine-Data.json'
import WineList from '../winelist/WineList'
import Constants from '../../constants/Constants'
import WineListType from '../../models/WineListType'
import MeasuresType from '../../models/MeasuresType'
import Utility from '../../utility/Utility'

const Home = () => {
    const [wineList, setWineList] = useState<WineListType[]>([])
    const [uniqueData,setUniqueData] = useState<any>({})
    const [flavanoidsData, setFlavanoidsData] = useState<MeasuresType[]>([])
    const [gammaData, setGammaData] = useState<MeasuresType[]>([])
    useEffect(() => {
        setWineList(WineData)
        storeUniqueRecords();
    },[wineList])
    // this function is to store multiple records with the same key. Here all unique keys are present
    function storeUniqueRecords() {
        wineList?.forEach((item: WineListType) => {
            if(item?.Alcohol in uniqueData) {
                let curr_list = uniqueData[item.Alcohol]
                curr_list.push(item)
                uniqueData[item.Alcohol] = curr_list;
                setUniqueData(uniqueData)
            } else {
                uniqueData[item.Alcohol] = [item]
                setUniqueData(uniqueData)
            }
        })
        findFlavanoids();
        findGamma();
    }
    function findFlavanoids() {
        let curr_list: MeasuresType[] = []
        for(let value of Object.values(uniqueData)) {
            let details: MeasuresType = {
                'mean': Utility.findMean(value, Constants.Flavanoids),
                'median': Utility.findMedian(value, Constants.Flavanoids),
                'mode': Utility.findMode(value, Constants.Flavanoids)
            }
            curr_list.push(details)
        }
        setFlavanoidsData(curr_list);
    }
    function findGamma() {
        let gammaCalculate: { [key: string | number]: any } = {};
        let curr_list: MeasuresType[] = []
        for(let [key,values] of Object.entries(uniqueData)) {
            let items: any = values;
            for(let value of items) {
                let res = (Number(value?.Ash) * Number(value?.Hue)) / Number(value?.Magnesium);
                if(key in gammaCalculate) {
                    gammaCalculate[key] = [...gammaCalculate[key], res]
                } else {
                    gammaCalculate[key] = [res]
                }
            }
            let details: MeasuresType = {
                'mean': Utility.findMean(gammaCalculate[key], Constants.Gamma),
                'median': Utility.findMedian(gammaCalculate[key], Constants.Gamma),
                'mode': Utility.findMode(gammaCalculate[key], Constants.Gamma)
            }
            curr_list.push(details)
        }
        setGammaData(curr_list)
    }
    return (
        <div>
            <h1 className="text-center">Data Visualization</h1>
            {                                       
                flavanoidsData?.length && <WineList class_name={'Alcohol'} col_property={'Flavanoids'} wineData={flavanoidsData}/>
            }
            {
                gammaData?.length && <WineList class_name={'Alcohol'} col_property={'Gamma'} wineData={gammaData}/>
            }
        </div>
    )
}

export default Home