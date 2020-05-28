const suppliersService = require('../services/SuppliersService');
const productsService = require('../services/ProductsService');
const supplierTypesService = require('../services/SupplierTypesService');
const linksOrdersProductsService = require('../services/LinksOrdersProductsService');
const deliveryService = require('../services/DeliverysService');
const supplierTypeId = 'supplier_type_id';
const productId = 'product_id';
const START_DATE = 'start_date';
const END_DATE = 'end_date';
const MIN_VALUE = 'min_value';
const DELIVERYS_PRODUCT_ID = 'deliverys_product_id';

class SuppliersController extends require('./BaseController') {

    static async listAllSuppliers(req, res) {
        const suppliers = await suppliersService.getByTypeIdProductIdDelivery(req.query[supplierTypeId], req.query[productId], req.query[START_DATE], req.query[END_DATE], req.query[MIN_VALUE], req.query[DELIVERYS_PRODUCT_ID]);
        const products = await productsService.getAll();
        const supplierTypes = await supplierTypesService.getAll();
        res.render('suppliers', {
            title: 'Все поставщики',
            data: {suppliers: suppliers, products: products, supplierTypes: supplierTypes},
            query: req.query
        })
    }

    static async getSuppliersAndDeliveryTimeByProduct(req, res) {
        let supplierProducts = await suppliersService.getSuppliersProductsDeliveryTimeByProduct(req.query[productId]);
        let products = await productsService.getAll();
        res.render('productsSuppliers', {
            data: {supplierProducts: supplierProducts, products: products},
            query: req.query
        })
    }

    static async getTopSuppliers(req, res) {
        let products = await productsService.getAll();
        let suppliers = await suppliersService.getTopSuppliersByProduct(req.query[productId]);
        res.render('suppliersTop10', {
            data: {suppliers: suppliers, products: products},
            query: req.query
        })
    }

    static async getProfit(req, res) {

        const {sum_count: sum_orders_count, sum_total_price: sum_orders_total_price} = (await linksOrdersProductsService.getSumCountAndTotalPrice(req.query[START_DATE], req.query[END_DATE]))[0];
        const suppliers = await suppliersService.getSuppliersAndProfit(req.query[START_DATE], req.query[END_DATE], sum_orders_count, sum_orders_total_price);
        const {sum_count: sum_delivery_count, sum_total_price: sum_delivery_total_price} = (await deliveryService.getSymTotalPriceByDate(req.query[START_DATE], req.query[END_DATE]))[0];
        res.render('suppliersProfit', {
            data: {
                suppliers: suppliers,
                sum_delivery_count: sum_delivery_count,
                sum_delivery_total_price: sum_delivery_total_price,
                sum_orders_count: sum_orders_count,
                sum_orders_total_price: sum_orders_total_price
            }
            ,query: req.query
        })
    }


}

module.exports = SuppliersController;