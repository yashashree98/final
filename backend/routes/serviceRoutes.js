import express, { query } from 'express';
import Service from '../models/serviceModel.js';
import expressAsyncHandler from 'express-async-handler';

const serviceRouter = express.Router();

serviceRouter.get('/', async (req, res) => {
    const services = await Service.find();
    res.send(services);
});

const PAGE_SIZE = 3;

serviceRouter.get('/search', expressAsyncHandler( async(req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const name = query.name || '';
    const price = query.price || '';
    const searchQuery = query.query || '';

    const queryFilter = searchQuery && searchQuery !== 'all' ? {
        name: {
            $regex: searchQuery,
            $options: 'i',
        },
    } : {};

    const nameFilter = name && name !== 'all' ? { name } : {};

    const priceFilter = price && price !== 'all' ? { price: {
        $gte: Number(price.split('-')[0]),
        $lte: Number(price.split('-')[1]),
       },
    } : {};

    const services = await Service.find(
        {
            ...queryFilter,
            ...nameFilter,
            ...priceFilter,
        }).skip(pageSize * (page - 1)).limit(pageSize);

        const countServices = await Service.countDocuments({
            ...queryFilter,
            ...nameFilter,
            ...priceFilter
        });

        res.send({
            services,
            countServices,
            page,
            pages: Math.ceil(countServices / pageSize),
        });
     })
);

serviceRouter.get('/slug/:slug', async (req, res) => {
    const service = await Service.findOne({slug:req.params.slug});
    if(service) {
        res.send(service);
    }
    else {
        res.send(404).send({ mesage: 'Service Not Found' });
    }
});

serviceRouter.get('/:id', async (req, res) => {
    const service = await Service.findById(req.params.id);
    if(service) {
        res.send(service);
    }
    else {
        res.send(404).send({ mesage: 'Service Not Found' });
    }
});


export default serviceRouter;