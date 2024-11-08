'use client'

import React, {useState} from 'react'
import {Avatar, Button, Input, Select, SelectItem, Tooltip} from '@nextui-org/react'
import {CheckIcon} from '@nextui-org/shared-icons'

const currencies = [
    {label: 'USD', value: 'USD', country: 'United States', icon: "us", key: "USD"},
]

export default function HeroSection() {
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('USD')
    const [convertedAmount, setConvertedAmount] = useState('')

    const handleExchange = () => {
        // Here you would typically call an API to get the current exchange rate
        // and calculate the converted amount. For now, we'll just log the input.
        //https://api.currencylayer.com/convert?from=EUR&to=GBP&amount=100
        console.log(`Converting ${amount} ${currency} to VND`)

        //Fetch API
        fetch(`https://api.currencylayer.com/convert?access_key=0dcda163fa387910b11a09eb6a8dbe32&from=${currency}&to=VND&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setConvertedAmount(data.result);
            });
    }

    return (
        <section className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Chuyển đổi tiền tệ nhanh chóng
                </h1>
                <p className="text-xl mb-8 text-center">
                    Chuyển đổi các đơn vị tiền tệ phổ biến sang VND với tỷ giá hôm nay
                </p>
                <div
                    className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg justify-center items-center">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <Input
                            type="number"
                            width={10}
                            label="Số tiền"
                            placeholder="Nhập số tiền cần chuyển đổi"
                            value={amount}
                            onValueChange={setAmount}
                            className="flex-grow w-32"
                            classNames={{
                                input: 'text-white',
                                label: 'text-white',
                            }}
                        />
                        <Select
                            label="Đơn vị tiền tệ"
                            placeholder="Chọn đơn vị tiền tệ"
                            selectedKeys={[currency]}
                            selectionMode={"single"}
                            onSelectionChange={(keys) => setCurrency(Array.from(keys)[0] as string)}

                            className="md:w-1/3 w-48"
                        >
                            {currencies.map((cur) => (
                                // <SelectItem key={cur.value} value={cur.value}>
                                //     {cur.label}
                                // </SelectItem>
                                <SelectItem
                                    key={cur.key}
                                    value={cur.label}
                                    startContent={<Avatar alt="Argentina" className="w-6 h-6"
                                                          src={`https://flagcdn.com/${cur.icon}.svg`}/>}
                                >
                                    [{cur.label}]
                                </SelectItem>

                            ))}
                        </Select>
                        <div className={"h-full w-32"}>
                            <Tooltip content="Chuyển đổi" placement="top">
                                <Input
                                    value={convertedAmount}
                                    label="VND"
                                />
                            </Tooltip>
                        </div>

                        <Button
                            endContent={<CheckIcon/>}
                            onClick={handleExchange}
                        >
                            Chuyển đổi
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}