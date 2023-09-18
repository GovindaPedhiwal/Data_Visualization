import Constants from "../constants/Constants";

export default class Utility {
    // this is used to calculate mean
    public static findMean(data: any, propertyName: string) {
        let sum = 0, len = 0;
        data?.forEach((item: any) => {
            len++;
            if(propertyName === Constants.Flavanoids)
                sum += Number(item?.Flavanoids)
            else if(propertyName === Constants.Gamma)
                sum += Number(item)
        })
        return (sum / len).toFixed(3)
    }
    // this is used to calculate median
    public static findMedian(data: any, propertyName: string) {
        if(propertyName === Constants.Flavanoids) {
            data.sort((first: { Flavanoids: number },second: { Flavanoids: number }) => {
                return first?.Flavanoids - second?.Flavanoids;
            })  
            let len: any = data?.length;
            if(len % 2 === 0) {
                let idx = len / 2;
                return Number(data[idx]?.Flavanoids).toFixed(3)
            } else {
                let idx = Math.floor(len / 2)
                let first_value = Number(data[idx-1]?.Flavanoids);
                let second_value = Number(data[idx]?.Flavanoids);
                return Number((first_value + second_value) / 2).toFixed(3);
            }
        } else if(Constants.Gamma){
            data.sort((first: number,second: number) => {
                return first - second;
            })  
            let len = data?.length;
            if(len % 2 === 0) {
                let idx = len / 2;
                return Number(data[idx]).toFixed(3)
            } else {
                let idx = Math.floor(len / 2)
                let first_value = Number(data[idx-1]);
                let second_value = Number(data[idx]);
                return Number((first_value + second_value) / 2).toFixed(3);
            }
        }
        return 0;
    }
    // this is used to calcualte mode
    public static findMode(data: any, propertyName: string) {
        let storeFrequency: { [key: string | number]: any } = {};
        let max_occurrence = 0;
        data?.forEach((item: any) => {
            let curr_value: any;
            if(propertyName === Constants.Flavanoids)
                curr_value = Number(item?.Flavanoids)
            else if(propertyName === Constants.Gamma) {
                curr_value = Number(item)
            }
            if(curr_value in storeFrequency) {
                storeFrequency[curr_value]++;
            } else {
                storeFrequency[curr_value] = 1;
            }
            if(storeFrequency[curr_value] > max_occurrence)
                max_occurrence = storeFrequency[curr_value]
        })
        // here we need to return the occurence actually but in the assignment it's requested that value should be rounded with 3 places
        return max_occurrence.toString() + ".000";
    }
}