import { beforeEach, describe, expect, it, vi } from "vitest";
import { normalizeQuantity, parseQuantity, parseUnit } from "./itemUtils";
import type { Product } from "../types";

vi.mock('../config/db', () => {
  return import('../config/__mocks__/db').then(x => ({
    db: x.db
  }))
})

import { db } from "../config/db";

describe('parseUnit()', () => {
  it('should return the correct unit from product.product_quantity_unit', () => {
    const product = {
      product_quantity_unit: 'g'
    }

    const result = parseUnit(product as Product)

    expect(result).toBe('g')
  })

  it('should return the correct unit from product.net_weight_unit', () => {
    const product = {
      net_weight_unit: 'g'
    }

    const result = parseUnit(product as Product)

    expect(result).toBe('g')
  })

  it('should return the correct unit from product.product_quantity_string', () => {
    const product = {
      product_quantity_string: '200g'
    }

    const result = parseUnit(product as Product)

    expect(result).toBe('g')
  })

  it('should return an empty string when data is missing the unit in product.product_quantity_string', () => {
    const product = {
      product_quantity_string: '200'
    }

    const result = parseUnit(product as Product)

    expect(result).toBe('')
  })

  it('should return the correct unit from product.quantity', () => {
    const product = {
      quantity: '200g'
    }

    const result = parseUnit(product as Product)

    expect(result).toBe('g')
  })

  it('should return an empty string when given malformed data', () => {
    const product = {
      product_name: "test"
    }

    const result = parseUnit(product as Product)

    expect(result).toBe('')
  })

  it('should return an empty string when data is missing the unit in product.quantity', () => {
    const product = {
      quantity: '200'
    }

    const result = parseUnit(product as Product)

    expect(result).toBe('')
  })
})


describe('parseQuantity()', () => {
  it('should return the correct quantity from product.product_quantity', () => {
    const product = {
      product_quantity: 200
    }

    const result = parseQuantity(product as Product)

    expect(result).toBe(200)
  })

  it('should return the correct quantity from product.quantity', () => {
    const product = {
      quantity: '200g'
    }

    const result = parseQuantity(product as Product)

    expect(result).toBe(200)
  })
})


describe('findGenericMatch()', () => {

})


describe('incrementQuantity()', () => {

})


describe('addQuantity()', () => {

})


describe('normalizeQuantity()', () => {
  const amount = 1
  it('should return the correct amount when given pounds', () => {
    const unit = 'lb'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(453.59)
  })

  it('Should return the correct amount when given ounces', () => {
    const unit = 'oz'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(28.35)
  })

  it('Should return the correct amount when given fluid ounces', () => {
    const unit = 'fl_oz'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(28.41)
  })

  it('Should return the correct amount when given kilos', () => {
    const unit = 'kg'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(1000)
  })

  it('Should return the correct amount when given litres', () => {
    const unit = 'l'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(1000)
  })

  it('Should return the correct amount when given ml', () => {
    const unit = 'ml'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(1)
  })

  it('Should return the correct amount when given grams', () => {
    const unit = 'g'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(1)
  })

  it('Should return the correct amount when given pieces', () => {
    const unit = 'pcs'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(1)
  })

  it('Should return the correct amount when given an all uppercase unit', () => {
    const unit = 'FL_OZ'

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(28.41)
  })

  it('Should return the given amount when an incorrect unit is given', () => {
    const uniqueAmount = 5
    const unit = 'INVALID'

    const result = normalizeQuantity(uniqueAmount, unit)

    expect(result).toBe(5)
  })

  it('should return the given amount when an empty unit is given', () => {
    const unit = ''

    const result = normalizeQuantity(amount, unit)

    expect(result).toBe(1)
  })
})
