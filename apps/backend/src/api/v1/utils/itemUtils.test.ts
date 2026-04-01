import { describe, expect, it } from "vitest";
import { parseQuantity, parseUnit } from "./itemUtils";
import type { Product } from "../types";

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
