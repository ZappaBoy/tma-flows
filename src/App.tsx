import './App.css'

import WebApp from '@twa-dev/sdk'
import {useState} from "react";

function App() {

    const [notes, setNotes] = useState<string>()
    const [keys, setKeys] = useState<string[]>()

    const ITEM_KEY = 'item_key'

    const showAlert = (message: string) => {
        WebApp.showAlert(message)
    }

    const saveItem = (key: string, value: string) => {
        WebApp.CloudStorage.setItem(key, value)
    }

    const getItem = (key: string): Promise<string | undefined> => {
        return new Promise((resolve, reject) => {
            WebApp.CloudStorage.getItem(key, (error, result) => {
                if (error) {
                    console.error(error)
                    reject(error)
                }
                resolve(result)
            })
        })
    }

    const showSavedItems = () => {
        getItem(ITEM_KEY).then((result) => {
            setNotes(result)
        })
    }

    const getKeys = (): Promise<string[] | undefined> => {
        return new Promise((resolve, reject) => {
            WebApp.CloudStorage.getKeys((error, result) => {
                if (error) {
                    console.error(error)
                    reject(error)
                }
                resolve(result)
            })
        })
    }

    const showSavedKeys = () => {
        getKeys().then((result) => {
            setKeys(result)
        })
    }

    return (
        <>
            <div>
                <h1>tma-flows</h1>
                <div className="card">
                    <h1>Init Data</h1>
                    {
                        WebApp.initData && <p>{WebApp.initData}</p>
                    }
                    {
                        WebApp.initData && <p>{JSON.stringify(WebApp.initData)}</p>
                    }
                    {
                        WebApp.initDataUnsafe && <p>{JSON.stringify(WebApp.initDataUnsafe)}</p>
                    }
                </div>
                <div className="card">
                    <button onClick={() => showAlert("This is an alert")}>
                        Show alert
                    </button>
                </div>
                <div className="card">
                    <button onClick={() => saveItem(ITEM_KEY, "item value")}>
                        Save item
                    </button>
                </div>
                <div className="card">
                    <button onClick={() => showSavedItems()}>
                        Show saved item
                    </button>
                </div>
                {
                    notes && <>
                        <div className="card">
                            <p>{notes}</p>
                        </div>
                    </>
                }
                <div className="card">
                    <button onClick={() => showSavedKeys()}>
                        Get saved keys
                    </button>
                </div>
                {
                    keys && <>
                        <div className="card">
                            <p>{keys}</p>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default App
