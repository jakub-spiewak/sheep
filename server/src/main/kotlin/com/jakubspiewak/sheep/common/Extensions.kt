package com.jakubspiewak.sheep.common

import com.jakubspiewak.sheep.generated.model.*

public fun EstimatedAmount.toResponse(): EstimatedAmount {
    return when (this.type) {

        EstimatedAmountTypeEnum.FIXED -> {
            this as FixedAmount
            FixedAmount(
                amount = this.amount,
                type = this.type
            )
        }

        EstimatedAmountTypeEnum.RANGE -> {
            this as RangeAmount
            RangeAmount(
                min = this.min,
                max = this.max,
                type = this.type
            )
        }

        EstimatedAmountTypeEnum.VARIANCE_AMOUNT -> {
            this as VarianceAmount
            VarianceAmount(
                amount = this.amount,
                variance = this.variance,
                type = this.type
            )
        }

        EstimatedAmountTypeEnum.VARIANCE_PERCENT -> {
            this as VariancePercent
            VariancePercent(
                amount = this.amount,
                variancePercent = this.variancePercent,
                type = this.type
            )
        }
    }
}

