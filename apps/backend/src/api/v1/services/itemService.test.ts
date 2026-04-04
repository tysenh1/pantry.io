import { describe, it, beforeEach, expect, vi } from "vitest";
import { ItemInfo } from "../../../../../shared/types";
import { createItem, handleBarcodeLookup } from "./itemService";
import Database from 'better-sqlite3';
import { type Database as Sqlite3Database } from 'better-sqlite3';
import fs from 'fs';
import { createSchema } from "../../../seed/importSeed";
import { seedTestData } from "../../../seed/testSeed";
import { OFFResponse, Pantry } from "../types";
import { Product } from "@openfoodfacts/openfoodfacts-nodejs";


let db: Sqlite3Database

describe('createItem()', () => {
  beforeEach(() => {
    db = new Database(':memory:')

    const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
    const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');

    createSchema(db, schemaSql)

    seedTestData(db)
  })
  describe('item already exists in pantry', () => {
    it('should update quantity with the item amount', () => {
      const item: ItemInfo = {
        barcode: 'testCode1',
        productName: 'test1',
        genericName: {
          id: 'testGrams',
          name: 'Grams'
        },
        unitSize: 200,
        unitType: 'g'
      }

      const newQuantityItem = createItem(item, db)

      const itemResult = db.prepare('SELECT barcode, product_name, generic_name_id, unit_size, unit_type FROM item WHERE barcode = ?').get(item.barcode)
      const pantryResult = db.prepare('SELECT * FROM pantry WHERE generic_name_id = ?').get(item.genericName.id) as Pantry

      expect(itemResult).toMatchObject({
        barcode: item.barcode,
        product_name: item.productName,
        generic_name_id: item.genericName.id,
        unit_size: item.unitSize,
        unit_type: item.unitType
      })
      expect(pantryResult.quantity).toBe(300)
      expect(newQuantityItem).toMatchObject({
        barcode: item.barcode,
        productName: item.productName,
        genericName: item.genericName,
        unitSize: 300,
        unitType: item.unitType
      })
    })
  })

  describe("item doesn't exist in pantry", () => {
    it('should create a pantry item with the item information', () => {
      const item: ItemInfo = {
        barcode: 'testCode2',
        productName: 'test2',
        genericName: {
          id: 'testGrams2',
          name: 'Grams'
        },
        unitSize: 200,
        unitType: 'g'
      }

      const newQuantityItem = createItem(item, db)

      const itemResult = db.prepare('SELECT barcode, product_name, generic_name_id, unit_size, unit_type FROM item WHERE barcode = ?').get(item.barcode)
      const pantryResult = db.prepare('SELECT * FROM pantry WHERE generic_name_id = ?').get(item.genericName.id) as Pantry

      expect(itemResult).toMatchObject({
        barcode: item.barcode,
        product_name: item.productName,
        generic_name_id: item.genericName.id,
        unit_size: item.unitSize,
        unit_type: item.unitType
      })
      expect(pantryResult.quantity).toBe(200)
      expect(newQuantityItem).toMatchObject({
        barcode: item.barcode,
        productName: item.productName,
        genericName: item.genericName,
        unitSize: 200,
        unitType: item.unitType
      })
    })
  })
})

describe('handleBarcodeLookup()', () => {
  beforeEach(() => {
    db = new Database(':memory:')

    const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
    const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');

    createSchema(db, schemaSql)

    seedTestData(db)
  })

  describe('item exists locally', () => {
    it('should return the local item', async () => {
      const barcode = 'testItem1'

      const result = await handleBarcodeLookup(barcode, db)

      expect(result).toMatchObject({
        doesItemExist: true,
        item: {
          barcode: barcode,
          productName: 'Test Item 1',
          genericName: { id: 'testGrams', name: 'Grams' },
          unitType: 'g',
          unitSize: 300
        },
        genericNames: [{ id: 'testGrams', name: 'Grams' }]
      })
    })
  })

  describe('item does not exist locally', () => {
    beforeEach(() => {
      vi.restoreAllMocks()
    })
    it('should return correct information when given a valid barcode', async () => {

      // @ts-expect-error This type sucks
      const product: Product = {
        product_name: 'Test',
        categories: 'this,is,a,test,grams',
        code: 'testItem2',
        product_quantity: '200',
        product_quantity_unit: 'g'
      }

      global.fetch = vi.fn().mockResolvedValue({
        json: () => ({
          code: 'good',
          status: 1,
          status_verbose: 'yeah its pretty good',
          product: product
        } as OFFResponse)
      })

      const result = await handleBarcodeLookup('random code', db)

      console.log(result)

    })
  })
})
