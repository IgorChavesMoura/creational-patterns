const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

//It could be in a separate file (start)

const dbData = [{ name: 'Mariazinha' }, { name: 'Joãozim' }];

class MockDatabase {

    connect = () => this;
    find = async (query) => dbData;

}

//It could be in a separate file (end)

rewiremock(() => require('./../src/util/database')).with(MockDatabase);

(async () => {

    {

        const expected = [{ name: 'MARIAZINHA' }, { name: 'JOÃOZIM' }];

        rewiremock.enable();

        const UserFactory = require('../src/factory/userFactory');
        	
        const userFactory = await UserFactory.createInstance();

        const result = await userFactory.find();

        deepStrictEqual(result, expected);

        rewiremock.disable();

    }
    
    {

        const expected = [{ name: 'IGORMOURA' }];

        const UserFactory = require('../src/factory/userFactory');
        	
        const userFactory = await UserFactory.createInstance();

        const result = await userFactory.find();

        deepStrictEqual(result, expected);

    }

})();