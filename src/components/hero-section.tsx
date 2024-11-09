'use client'

import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Input,
    Select,
    type SelectedItems,
    SelectItem,
    type SharedSelection,
    Spacer
} from '@nextui-org/react'
import { CheckIcon } from '@nextui-org/shared-icons'
import {priceVietNamDongformetter} from "../lib/utils.tsx";

type Currency = {
    label: string
    value: string
    country: string
    icon: string
    key: string
}

const currencies: Currency[] = [
    {
        label: 'USD',
        value: 'USD',
        country: 'Đô la Mỹ',
        icon: 'us',
        key: 'USD',
    },
    {
        label: 'EUR',
        value: 'EUR',
        country: 'EURO',
        icon: 'eu',
        key: 'EUR',
    },
    {
        label: 'GBP',
        value: 'GBP',
        country: 'Bảng Anh',
        icon: 'gb',
        key: 'GBP',
    },
    {
        label: 'JPY',
        value: 'JPY',
        country: 'Yên Nhật',
        icon: 'jp',
        key: 'JPY',
    },
    {
        label: 'CNY',
        value: 'CNY',
        country: 'Nhân dân tệ',
        icon: 'cn',
        key: 'CNY',
    },
]

export default function HeroSection() {
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('USD')
    const [convertedAmount, setConvertedAmount] = useState('')

    const handleExchange = () => {
        console.log(`Converting ${amount} ${currency} to VND`)

        fetch(`https://api.currencylayer.com/convert?access_key=0dcda163fa387910b11a09eb6a8dbe32&from=${currency}&to=VND&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setConvertedAmount(data.result);
            });
    }

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-slate-500 to-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-6 text-center text-white">
                        Chuyển đổi tiền tệ nhanh chóng
                    </h1>
                    <p className="text-xl mb-8 text-center text-white">
                        Chuyển đổi các đơn vị tiền tệ phổ biến sang VND với tỷ giá hôm nay
                    </p>
                    <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <Input
                                type="number"
                                label="Số tiền"
                                placeholder="Nhập số tiền cần chuyển đổi"
                                value={amount}
                                onValueChange={setAmount}
                                className="flex-grow"
                                classNames={{
                                    input: 'text-white',
                                    label: 'text-white',
                                }}
                            />
                            <Select
                                items={currencies}
                                label="Loại tiền tệ"
                                placeholder="Chọn loại tiền"
                                className="w-full md:w-full"
                                classNames={{
                                    trigger: "h-12",
                                }}
                                onSelectionChange={(items: SharedSelection) => {
                                    // console.log(items.currentKey);
                                    // @ts-ignore
                                    setCurrency(items.currentKey);
                                }}
                                renderValue={(items: SelectedItems<Currency>) => {
                                    return items.map((item) => (
                                        <div key={item.key} className="flex flex-row">
                                            <Avatar alt={item.data?.country} className="w-6 h-6" src={`https://flagcdn.com/${item.data?.icon}.svg`} />
                                            <Spacer x={2}/>
                                            {item.data?.value}
                                        </div>
                                    ));
                                }}
                            >
                                {(currency) => (
                                    <SelectItem
                                        key={currency.key}
                                        value={currency.label}
                                        onSelect={() => setCurrency(currency.value)}
                                        startContent={<Avatar alt={currency.country} className="w-6 h-6" src={`https://flagcdn.com/${currency.icon}.svg`} />}
                                    >
                                        {currency.country} [{currency.label}]
                                    </SelectItem>
                                )}
                            </Select>
                            <Input
                                value={priceVietNamDongformetter(convertedAmount)}
                                label="VND"
                                className="w-full md:w-full"
                            />
                            <Button
                                className="h-14 w-full md:w-auto"
                                color="primary"
                                variant="shadow"
                                endContent={<CheckIcon />}
                                onClick={handleExchange}
                            >
                                Chuyển đổi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}