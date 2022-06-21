import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

import {Chart as ChartJS, registerables as registerablesJS} from 'chart.js'
import {Chart} from 'react-chartjs-2'

ChartJS.register(...registerablesJS)

function App() {
    const uname_1 = "Yves", uname_2 = "Olas", password_1 = "1234POPS", password_2 = "SOMETHING";
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    })
    const [w, setW] = useState(0)
    const [yves, setYves] = useState([])
    const [olas, setOlas] = useState([])
    const [opt, setOpt] = useState(0)

    useEffect(() => {
        const id = setInterval(() =>
            axios.get('/api/yves/')
                .then(resp => {
                    if (resp.data !== yves) {
                        setYves(resp.data)
                    }
                }), 10000)
        const id_1 = setInterval(() =>
            axios.get('/api/olas/')
                .then(resp => {
                    if (resp.data !== olas) {
                        setOlas(resp.data)
                    }
                }), 10000)

        return () => {
            clearInterval(id)
            clearInterval(id_1)
        }
    }, [])

    const logOut = () => {
        setLoginDetails({
            username: "",
            password: ""
        })
        setW(0)
    }

    const subForm = (e) => {
        e.preventDefault()

        if (loginDetails.username === uname_1 && loginDetails.password === password_1) setW(1)
        else if (loginDetails.username === uname_2 && loginDetails.password === password_2) setW(2)
        else setW(5)
    }

    return (
        <>
            {
                w === 2 ?
                    <>
                        <div className="container mx-auto text-center my-12">
                            <div className="uppercase mb-4">
                                <h4>OLUSHOLA OLABAMIBO</h4>
                                <h4>17CK022628</h4>
                                <button className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-800 duration-300" onClick={logOut}>
                                    Log Out
                                </button>
                            </div>

                            <div className="w-1/2 mx-auto mb-4 h-f flex flex-col justify-center">
                                {
                                    opt === 0 ?
                                        <section className="flex flex-row">
                                            <div className={'mx-4'}>
                                                <h4 className='font-extrabold text-2xl'>TEMPERATURE</h4>
                                                <CircularProgressbar
                                                    value={olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].temp}
                                                    text={olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].temp + "°C"}
                                                    styles={buildStyles({
                                                        pathColor: `rgba(62, 152, 199, ${olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].temp})`,
                                                    })}
                                                />
                                            </div>
                                            <div className={'mx-4'}>
                                                <h4 className='font-extrabold text-2xl'>AIR QUALITY</h4>
                                                <CircularProgressbar
                                                    value={olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].air_q}
                                                    text={olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].air_q}
                                                    styles={buildStyles({
                                                        pathColor: `rgba(62, 152, 199, ${olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].pulse_rate})`,
                                                    })}
                                                />
                                            </div>
                                            <div className={'mx-4'}>
                                                <h4 className='font-extrabold text-xl'>HUMIDITY</h4>
                                                <CircularProgressbar
                                                    value={olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].hum}
                                                    text={olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].hum}
                                                    styles={buildStyles({
                                                        pathColor: `rgba(62, 152, 199, ${olas[olas.length - 1] === undefined ? null : olas[olas.length - 1].blood_oxygen})`,
                                                    })}
                                                />
                                            </div>
                                        </section>
                                        : opt === 1 ?
                                            <>
                                                <Chart
                                                    type={'line'}
                                                    data={{
                                                        labels: olas.map(d => Intl.DateTimeFormat(navigator.language, {
                                                            weekday: 'long',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        }).format(d.time)),
                                                        datasets: [
                                                            {
                                                                // yAxisID: 'power',
                                                                label: 'Temperature',
                                                                backgroundColor: 'rgb(234,88,12)',
                                                                borderColor: 'rgb(234,88,12)',
                                                                data: olas.map(d => d.temp),
                                                                lineTension: 0.4,
                                                            },
                                                            {
                                                                // yAxisID: 'current',
                                                                label: 'Air Quality',
                                                                backgroundColor: 'rgb(0,104,16)',
                                                                borderColor: 'rgb(0,104,16)',
                                                                data: olas.map(d => d.air_q),
                                                                lineTension: 0.4,
                                                            },
                                                            {
                                                                // yAxisID: 'voltage',
                                                                label: 'Humidity',
                                                                backgroundColor: 'rgb(185 28 28)',
                                                                borderColor: 'rgb(185 28 28)',
                                                                data: olas.map(d => d.hum),
                                                                lineTension: 0.4,
                                                            }
                                                        ]
                                                    }}
                                                    options={{
                                                        bezierCurve: true,
                                                        maintainAspectRatio: false,
                                                        scales: {
                                                            y1: {
                                                                display: true,
                                                                ticks: {display: false},
                                                                gridLines: {drawBorder: false},
                                                                position: 'left',
                                                            },
                                                            y2: {
                                                                display: true,
                                                                ticks: {display: false},
                                                                gridLines: {drawBorder: false},
                                                                position: 'right',
                                                            },
                                                            y3: {
                                                                display: true,
                                                                ticks: {display: false},
                                                                gridLines: {drawBorder: false},
                                                                position: 'right',
                                                            }
                                                        },
                                                        plugins: {
                                                            legend: {
                                                                display: true,
                                                                position: 'bottom'
                                                            },
                                                        },
                                                    }}
                                                />
                                            </>
                                            :
                                            <>
                                                <table className="table-auto">
                                                    <thead>
                                                    <tr>
                                                        <th>Room Temperature °C</th>
                                                        <th>Air Quality</th>
                                                        <th>Humidity</th>
                                                        <th>Time</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className={'text-left'}>
                                                    {
                                                        olas.map((i, k) =>
                                                            <tr key={k}>
                                                                <td>{i === undefined ? null : i.temp}</td>
                                                                <td>{i === undefined ? null : i.air_q}</td>
                                                                <td>{i === undefined ? null : i.hum}</td>
                                                                <td>{i === undefined ? null : new Date(i.created_at * 1).toGMTString()}</td>
                                                            </tr>)
                                                    }
                                                    </tbody>
                                                </table>
                                            </>
                                }
                            </div>

                            <div className="my-4">
                                <div className="mx-auto border w-fit flex flex-row">
                                    <h5 onClick={() => setOpt(0)}
                                        className={'py-4 px-8 duration-500 cursor-pointer ' + (opt === 0 ? "bg-blue-400 text-white" : null)}>CURRENT</h5>
                                    <h5 onClick={() => setOpt(1)}
                                        className={'py-4 px-8 duration-500 cursor-pointer ' + (opt === 1 ? "bg-blue-400 text-white" : null)}>CHART</h5>
                                    <h5 onClick={() => setOpt(2)}
                                        className={'py-4 px-8 duration-500 cursor-pointer ' + (opt === 2 ? "bg-blue-400 text-white" : null)}>TABLE</h5>
                                </div>
                            </div>
                        </div>
                    </>
                    : w === 1 ?
                        <>
                            <div className="container mx-auto text-center my-12">
                                <div className="uppercase mb-4">
                                    <h4>Wilcox Yvette</h4>
                                    <h4>17CK022646</h4>
                                    <button className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-800 duration-300" onClick={logOut}>
                                        Log Out
                                    </button>
                                </div>

                                <div className="w-1/2 mx-auto mb-4 h-f flex flex-col justify-center overflow-y-scroll">
                                    {
                                        opt === 0 ?
                                            <section className="flex flex-row">
                                                <div className={'mx-4'}>
                                                    <h4 className='font-extrabold text-2xl'>{yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].temp} °C</h4>
                                                    <CircularProgressbar
                                                        value={yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].temp}
                                                        text={'°C'}
                                                        styles={buildStyles({
                                                            pathColor: `rgba(62, 152, 199, ${yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].temp})`,
                                                        })}
                                                    />
                                                </div>
                                                <div className={'mx-4'}>
                                                    <h4 className='font-extrabold text-2xl'>Pulse rate</h4>
                                                    <CircularProgressbar
                                                        value={yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].pulse_rate}
                                                        text={yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].pulse_rate}
                                                        styles={buildStyles({
                                                            pathColor: `rgba(62, 152, 199, ${yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].pulse_rate})`,
                                                        })}
                                                    />
                                                </div>
                                                <div className={'mx-4'}>
                                                    <h4 className='font-extrabold text-xl'>Blood Oxygen</h4>
                                                    <CircularProgressbar
                                                        value={yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].blood_oxygen}
                                                        text={yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].blood_oxygen}
                                                        styles={buildStyles({
                                                            pathColor: `rgba(62, 152, 199, ${yves[yves.length - 1] === undefined ? null : yves[yves.length - 1].blood_oxygen})`,
                                                        })}
                                                    />
                                                </div>
                                            </section>
                                            : opt === 1 ?
                                                <>
                                                    <Chart
                                                        type={'line'}
                                                        data={{
                                                            labels: yves.map(d => Intl.DateTimeFormat(navigator.language, {
                                                                weekday: 'long',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            }).format(d.time)),
                                                            datasets: [
                                                                {
                                                                    // yAxisID: 'power',
                                                                    label: 'Temperature',
                                                                    backgroundColor: 'rgb(234,88,12)',
                                                                    borderColor: 'rgb(234,88,12)',
                                                                    data: yves.map(d => d.temp),
                                                                    lineTension: 0.4,
                                                                },
                                                                {
                                                                    // yAxisID: 'current',
                                                                    label: 'Blood Oxygen',
                                                                    backgroundColor: 'rgb(0,104,16)',
                                                                    borderColor: 'rgb(0,104,16)',
                                                                    data: yves.map(d => d.blood_oxygen),
                                                                    lineTension: 0.4,
                                                                },
                                                                {
                                                                    // yAxisID: 'voltage',
                                                                    label: 'Pulse Rate',
                                                                    backgroundColor: 'rgb(185 28 28)',
                                                                    borderColor: 'rgb(185 28 28)',
                                                                    data: yves.map(d => d.pulse_rate),
                                                                    lineTension: 0.4,
                                                                }
                                                            ]
                                                        }}
                                                        options={{
                                                            bezierCurve: true,
                                                            maintainAspectRatio: false,
                                                            scales: {
                                                                y1: {
                                                                    display: true,
                                                                    ticks: {display: false},
                                                                    gridLines: {drawBorder: false},
                                                                    position: 'left',
                                                                },
                                                                y2: {
                                                                    display: true,
                                                                    ticks: {display: false},
                                                                    gridLines: {drawBorder: false},
                                                                    position: 'right',
                                                                },
                                                                y3: {
                                                                    display: true,
                                                                    ticks: {display: false},
                                                                    gridLines: {drawBorder: false},
                                                                    position: 'right',
                                                                }
                                                            },
                                                            plugins: {
                                                                legend: {
                                                                    display: true,
                                                                    position: 'bottom'
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </>
                                                :
                                                <>
                                                    <table className="table-auto mt-24">
                                                        <thead>
                                                        <tr>
                                                            <th>Temperature °C</th>
                                                            <th>Blood Oxygen</th>
                                                            <th>Pulse Rate</th>
                                                            <th>Time</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody className={'text-left'}>
                                                        {
                                                            yves.map((i, k) =>
                                                                <tr key={k}>
                                                                    <td>{i === undefined ? null : i.temp}</td>
                                                                    <td>{i === undefined ? null : i.blood_oxygen}</td>
                                                                    <td>{i === undefined ? null : i.pulse_rate}</td>
                                                                    <td>{i === undefined ? null : new Date(i.created_at * 1).toGMTString()}</td>
                                                                </tr>)
                                                        }
                                                        </tbody>
                                                    </table>
                                                </>
                                    }
                                </div>

                                <div className="my-4">
                                    <div className="mx-auto border w-fit flex flex-row">
                                        <h5 onClick={() => setOpt(0)}
                                            className={'py-4 px-8 duration-500 cursor-pointer ' + (opt === 0 ? "bg-blue-400 text-white" : null)}>CURRENT</h5>
                                        <h5 onClick={() => setOpt(1)}
                                            className={'py-4 px-8 duration-500 cursor-pointer ' + (opt === 1 ? "bg-blue-400 text-white" : null)}>CHART</h5>
                                        <h5 onClick={() => setOpt(2)}
                                            className={'py-4 px-8 duration-500 cursor-pointer ' + (opt === 2 ? "bg-blue-400 text-white" : null)}>TABLE</h5>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <section className={'w-100 h-screen flex justify-center items-center'}>
                            <div className="w-full max-w-xs">
                                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                      onSubmit={(e) => subForm(e)}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                            Username
                                        </label>
                                        <input
                                            onChange={(e) => setLoginDetails({
                                                ...loginDetails,
                                                ["username"]: e.target.value
                                            })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="username" type="text" placeholder="Username"/>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            onChange={(e) => setLoginDetails({
                                                ...loginDetails,
                                                ["password"]: e.target.value
                                            })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password" type="password" placeholder="******************"/>
                                    </div>
                                    {w === 5 && <div className="text-red-500 text-xs pb-4">Wrong User Details</div>}
                                    <div className="flex items-center justify-between">
                                        <input
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="submit" value='Sign In'/>
                                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                           href="#">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </form>
                                <p className="text-center text-gray-500 text-xs">
                                </p>
                            </div>
                        </section>
            }
        </>
    );
}

export default App;
