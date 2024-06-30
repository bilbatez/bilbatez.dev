import { memo } from "react"
import clsx from "clsx/lite"
import { ErrorMessage as em } from "../../_constants/error-messages"
import { ErrorMessage } from "@hookform/error-message"
import { RegisterOptions, useFormContext } from "react-hook-form"

interface Props {
    id: string,
    label: string,
    min?: number,
    max?: number,
    width?: string,
    containerClassName?: string,
    inputClassName?: string,
    hidden?: boolean,
    placeholder?: string,
    roundNumber?: boolean,
}

function NumberInputField({
    id,
    label,
    min,
    max,
    width,
    containerClassName,
    inputClassName,
    hidden = false,
    placeholder,
    roundNumber,
}: Props) {

    const {
        register,
        trigger,
        formState: { errors },
    } = useFormContext()

    const options: RegisterOptions = {
        required: em.REQUIRED,
        min: {
            value: min ?? 0,
            message: em.MINIMUM_NUMBER(min ?? 0)
        },
        onChange: () => trigger(id)

    }

    if (max) {
        options.max = {
            value: max,
            message: em.MAXIMUM_NUMBER(max)
        }
    }

    const isRoundNumber: boolean = roundNumber ?? false

    if (isRoundNumber) {
        options.valueAsNumber = true
        options.validate = {
            validateIsNumber: (num) => !isNaN(num) || em.MUST_BE_NUMBER,
            validateRoundNumber: (num) => num % 1 === 0 || em.MUST_BE_ROUND_NUMBER,
        }
    }

    return (
        <>
            <div className={clsx("mb-2", width, containerClassName)}>
                <label htmlFor={id}>{label}</label>
                <input className={clsx(
                    "std-in",
                    hidden && "hidden",
                    inputClassName,
                    errors?.[id] && "has-error",
                )}
                    placeholder={placeholder}
                    {...register(id, options)}
                />
                <div className="error-message">
                    <ErrorMessage name={id} errors={errors} />
                </div>
            </div>
        </>
    )
}

export default memo(NumberInputField)