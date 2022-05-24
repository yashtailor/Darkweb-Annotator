import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { VictoryPie } from "victory-pie";

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function App() {
    const [text,setText] = useState();
    const [res,setRes] = useState([]);
    const [curTopic,setCurTopic] = useState();
    const [pieData,setPieData]= useState([
        { x: "Group A", y: 900 },
        { x: "Group B", y: 400 },
        { x: "Group C", y: 300 },
    ]);  
    const analyse = async()=>{
        const res = await axios.post('http://localhost:5000/analyse',{text:text})
        let fwords = res.data.final_words;
        fwords = fwords.map((fword)=>{
            let sum = fword.val.reduce((a, b) => a + b, 0)==0;
            if(sum==0)return fword;
            fword.val = fword.val.map((val)=>(val/sum)*100);
            return fword;
        })
        let fArr = [0,0,0,0];
        fwords.map((fword)=>{
            let fVal = fword.val;
            fArr[0] += fVal[0]>fVal[1]?fVal[0]:fVal[1];
            fArr[1] += fVal[2];
            fArr[2] += fVal[3];
            fArr[3] += fVal[4];
        })
        let maxIdxTopic = indexOfMax(fArr);
        if(maxIdxTopic == 0)setCurTopic('Security');
        else if(maxIdxTopic == 1)setCurTopic('Fundraising and Elections');
        else if(maxIdxTopic == 2)setCurTopic('Social Media & Business');
        else if(maxIdxTopic == 3)setCurTopic('Medical and Health');
        let pData = [];
        pData.push({x:'Security',y:fArr[0]});
        pData.push({x:'Fundraising & Elections',y:fArr[1]});
        pData.push({x:'Social Mesia & Business',y:fArr[2]});
        pData.push({x:'Health & Medical',y:fArr[3]});
        console.log(pData);
        setRes(fwords);
        setPieData(pData);
    }
    const changeHandler = (event)=>{
        setText(event.target.value);
    }
    const getClass = (arr)=>{
        if(arr.reduce((a, b) => a + b, 0)==0)return '';
        const maxIndex = indexOfMax(arr);
        if(maxIndex==0 || maxIndex==1)return 'security';
        else if(maxIndex==2)return 'election';
        else if(maxIndex==3)return 'social';
        else if(maxIndex==4)return 'health';
    }
    return(
        <div class="w-full h-full bg-gray-300">
            <div class="flex justify-center">
                <div class="mb-3 xl:w-10/12">
                    <label for="exampleFormControlTextarea1" class="mt-4 text-lg font-semibold form-label inline-block mb-2 text-gray-700"
                    >Document
                    </label>
                    <textarea
                    class="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleFormControlTextarea1"
                    rows="10"
                    placeholder="Start Writing..."
                    onChange={changeHandler}
                    ></textarea>
                    <div class="flex justify-center"><button onClick={()=>{analyse()}} class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Analyse
                    </button></div>
                </div>
            </div>
            <div class='flex justify-center'>
                {curTopic && <div className='font-bold text-2xl'>Cur Topic : {curTopic}
                    <div><VictoryPie
                        data={pieData}
                        colorScale={["blue", "yellow", "red","purple"]}
                        radius={100}
                    /></div>
                </div>}
            </div>
            <div class='flex justify-center break-words w-screen'>{res.length!=0 && (<div class="mb-3 bg-white w-10/12">
                {res.map((item)=>
                    <span class={`Token ${getClass(item.val)}`}>{item.name}</span>
                )}
            </div>)}</div>
        </div>
    );
}

export default App;