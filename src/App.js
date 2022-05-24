import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';
import {Chart as ChartJS, registerables as registerablesJS} from 'chart.js'
import {Chart} from 'react-chartjs-2'
import {useEffect, useState} from "react";
import axios from "axios";

ChartJS.register(...registerablesJS)


function App() {
    const [percentage, setPercentage] = useState(0)
    const [tab, setTab] = useState(0)
    const [deets, setDeet] = useState([])
    const [ch, setCh] = useState([])
    const [ch1, setCh1] = useState([])

    useEffect(() => {
        axios.get('/api/channels/')
            .then(resp => {
                console.log(resp.data)
                setCh(resp.data.filter(i => i.name === "pump_state")[0])
                setCh1(resp.data.filter(i => i.name === "pump_state_overwrite")[0])
            })
        axios.get('/api/water_level')
            .then(resp => {
                setDeet(resp.data)
                setPercentage(resp.data[resp.data.length - 1].value)
            })
    }, [])

    return (
        <div className="container mx-auto text-center">
            <div className="uppercase mb-4">
                <h4>Ezemonye Enoch C.</h4>
                <h4>17CK022586</h4>
            </div>
            <div className="mb-4">
                <h4 className="uppercase">PUMP <span>{(ch.state || ch1.state) ? "ON" : "OFF"}</span></h4>
            </div>

            <div className="w-1/3 lg:w-1/6 mx-auto mb-4 h-96 flex flex-col justify-center">
                {
                    tab === 0 ?
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={buildStyles({
                                pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                            })}
                        />
                        :
                        <Chart
                            type={'line'}
                            data={{
                                labels: deets.map(d => Intl.DateTimeFormat(navigator.language, {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }).format(d.created_at)),
                                datasets: [
                                    {
                                        // yAxisID: 'power',
                                        label: 'Water Level',
                                        backgroundColor: 'rgb(12,175,234)',
                                        borderColor: 'rgb(12,175,234)',
                                        data: deets.map(d => d.value),
                                        lineTension: 0.4,
                                    }
                                ]
                            }}
                            options={{
                                bezierCurve: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y1: {
                                        display: false,
                                        ticks: {display: false},
                                        gridLines: {drawBorder: false},
                                        position: 'left',
                                    }
                                },
                                plugins: {
                                    legend: {
                                        display: false,
                                        position: 'bottom'
                                    },
                                },
                            }}
                        />
                }
            </div>

            <button onClick={(e) => {
                e.preventDefault()
                console.log(1)
                const params = new URLSearchParams()
                params.append('id', ch1._id)
                params.append('name', ch1.name)
                params.append('value', ch1.value)
                params.append('state', (!ch1.state).toString())

                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }


                axios.patch('/api/channels/', params, config)
                    .then(resp => {
                        console.log(resp.data)
                        setCh(resp.data.filter(i => i.name === "pump_state")[0])
                        setCh1(resp.data.filter(i => i.name === "pump_state_overwrite")[0])
                    })
                    .catch((e) => console.log(e))
            }}
                    className={'bg-blue-400 duration-500 text-white px-4 py-2 rounded hover:bg-blue-600 duration-200 ' + (ch1.state && "bg-red-600 hover:bg-red-800")}>
                Override Pump
            </button>

            <div className="my-4">
                <div className="mx-auto border w-fit flex flex-row">
                    <h5 onClick={() => setTab(0)}
                        className={'py-4 px-8 duration-500 cursor-pointer ' + (tab === 0 ? "bg-blue-400 text-white" : null)}>LEVEL</h5>
                    <h5 onClick={() => setTab(1)}
                        className={'py-4 px-8 duration-500 cursor-pointer ' + (tab === 1 ? "bg-blue-400 text-white" : null)}>HISTORY</h5>
                </div>
            </div>
        </div>
    );
}

export default App;
