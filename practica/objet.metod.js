const paciente = {
    name: 'andres',
    age: 26,
    diagnostic: 'hap'
};

const desgloce = Object.keys(paciente)

const filtrado = desgloce.find(itr => itr === 'age')

console.log(filtrado)