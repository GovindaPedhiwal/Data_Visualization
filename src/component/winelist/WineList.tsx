import React from 'react'
import './WineList.css'

const WineList = ({class_name, col_property, wineData}: {class_name: string, col_property: string, wineData: any}) => {
    return (
        <div className="winelist_wrapper">
            <h2 className="text-center">{col_property} Details</h2>
            <table className="text-center">
                <thead>
                    <tr>
                        <th>Measure</th>
                        <th>{col_property} Mean</th>
                        <th>{col_property} Median</th>
                        <th>{col_property} Mode</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        wineData?.map((item: any,idx: number) => {
                            return <tr key={idx + 1}>
                                <td>{class_name} {idx + 1}</td>
                                <td>{item?.mean}</td>
                                <td>{item?.median}</td>
                                <td>{item?.mode}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default WineList