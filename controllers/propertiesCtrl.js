const { 
    addProperty,
    getProperties,
    getProperty,
    addPropertyFavorite,
} = require("./../services/propertiesService")

const create = async (req, res) => {
    try {
        const property = req.body;
        const { statusHttp, response} = await addProperty(property);
        res.status(statusHttp).json(response);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAll = async (req, res) => {
    try {
        const filter = req.query;
        const { statusHttp, response } = await getProperties(filter);
        res.status(statusHttp).json(response); 
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const { statusHttp, response } = await getProperty(id);
        res.status(statusHttp).json(response); 
    } catch (error) {
        res.status(500).send(error);        
    }
}

const uploadImage = (req, res) => {
    if (!req.files) {
        res.status(400).send('No files');
    }

    const propertyImage = req.files.propertyImage;
    const nameSplited = propertyImage.name.split('.');
    const ext = nameSplited[nameSplited.length - 1];
    const newFileName = Math.floor(Date.now()) + '.' + ext;
    
    const path = __dirname + '/../public/' + newFileName;
        
    console.log('size', propertyImage.size);
    propertyImage.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ fileName: newFileName})
    })
}
/*const signupFavorite = async (req, res) => {
    try {
        const user =  req.body;   
        const {statusHttp, response} = await addPropertyFavorite(user);
        //TODO
        res.status(statusHttp).json(response);
    } catch (error) {
        res.status(500).send(error);
    }
};*/

module.exports = {
    create,
    getAll,
    getDetail,
    uploadImage
};