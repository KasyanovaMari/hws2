import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'
import s from './SuperSelect.module.css'

type OptionType = {
    id: number
    value: string
}

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: OptionType[]
    onChangeOption?: (option: number) => void // более строгий тип
    value?: number                         // обязательно укажи value тут
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
                                                         options,
                                                         className,
                                                         onChangeOption,
                                                         value,
                                                         ...restProps
                                                     }) => {
    // Мапим options на <option> с value=id
    const mappedOptions = options
        ? options.map((o) => (
            <option
                id={'hw7-option-' + o.id}
                className={s.option}
                key={o.id}
                value={o.id} // передаём id как value
            >
                {o.value}
            </option>
        ))
        : []

    // Когда пользователь выбирает option, вызываем onChangeOption с id (число)
    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChangeOption) {
            onChangeOption(Number(e.target.value))
        }
    }

    // Класс для select
    const finalSelectClassName = s.select + (className ? ' ' + className : '')

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            value={value} // Важно контролировать выбранное значение!
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
