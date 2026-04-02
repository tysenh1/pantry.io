import { beforeEach, describe, expect, it, vi } from "vitest";
import { addQuantity, normalizeQuantity, parseQuantity, parseUnit } from "./itemUtils";
import type { Product, QuantityUpdateInfo } from "../types";

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
  describe('when unitType equals info.primary_unit', () => {
    it('adds grams quantity correctly', () => {
      const info = {
        primary_unit: 'g',
        quantity: 200
      }

      const unitType = 'g'
      const unitSize = 150

      const result = addQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(350)
    })

    it('adds ounces quantity correctly', () => {
      const info = {
        primary_unit: 'oz',
        quantity: 15
      }
      const unitType = 'oz'
      const unitSize = 4

      const result = addQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(19)
    })
  })

  describe("when unitType doesn't equal info.primary_unit", () => {
    it('adds grams and ounces correctly', () => {
      const info = {
        primary_unit: 'g',
        quantity: 150
      }
      const unitType = 'oz'
      const unitSize = 4

      const result = addQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(263)
    })

    it('adds grams and kg correctly', () => {
      const info = {
        primary_unit: 'g',
        quantity: 150
      }
      const unitType = 'kg'
      const unitSize = 2

      const result = addQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(2150)
    })

    it('adds ml and fluid ounces correctly', () => {
      const info = {
        primary_unit: 'ml',
        quantity: 200
      }
      const unitType = 'fl_oz'
      const unitSize = 4

      const result = addQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(313)
    })

    it('adds pcs and grams', () => {
      const info = {
        primary_unit: 'pcs',
        quantity: 10,
        weight_per_piece: 50
      }
      const unitType = 'g'
      const unitSize = 200

      const result = addQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(14)
    })

    it('adds pcs and ounces', () => {
      const info = {
        primary_unit: 'pcs',
        quantity: 10,
        weight_per_piece: 50
      }
      const unitType = 'oz'
      const unitSize = 5

      const result = addQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(12)
    })
  })
})


describe('normalizeQuantity()', () => {
  const amount = 1
  it('should return the correct amount when given pounds', () => {
    const fromUnit = 'lb'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(453.59)
  })

  it('Should return the correct amount when given ounces', () => {
    const fromUnit = 'oz'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(28.35)
  })

  it('Should return the correct amount when given fluid ounces', () => {
    const fromUnit = 'fl_oz'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(28.41)
  })

  it('Should return the correct amount when given kilos', () => {
    const fromUnit = 'kg'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(1000)
  })

  it('Should return the correct amount when given litres', () => {
    const fromUnit = 'l'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(1000)
  })

  it('Should return the correct amount when given ml', () => {
    const fromUnit = 'ml'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(1)
  })

  it('Should return the correct amount when given grams', () => {
    const fromUnit = 'g'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(1)
  })

  it('Should return the correct amount when given pieces', () => {
    const fromUnit = 'pcs'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(1)
  })

  it('Should return the correct amount when given an all uppercase unit', () => {
    const fromUnit = 'FL_OZ'

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(28.41)
  })

  it('Should return the given amount when an incorrect unit is given', () => {
    const uniqueAmount = 5
    const fromUnit = 'INVALID'

    const result = normalizeQuantity(uniqueAmount, fromUnit)

    expect(result).toBe(5)
  })

  it('should return the given amount when an empty unit is given', () => {
    const fromUnit = ''

    const result = normalizeQuantity(amount, fromUnit)

    expect(result).toBe(1)
  })
})
