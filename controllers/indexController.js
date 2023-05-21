const {PrismaClient, Prisma} = require("@prisma/client")
const prisma = new PrismaClient



exports.getIndex = async function(req, res) {
  try {
    const data = await prisma.data.findMany();
    const datas = data.map((row) => {
      const { id, keyA, keyB, lastName, firstName, middleName, gender, birthdate, hobbies, address, zip, civilStatus } = row;
      const affineDecrypt = (str) => {
        let result = '';
        const modInvA = findModInverse(keyA, 26);
        for (let i = 0; i < str.length; i++) {
          const charCode = str.charCodeAt(i);
          if (charCode >= 65 && charCode <= 90) { // uppercase letters
            const decryptedCharCode = (modInvA * (charCode + 26 - 65 + keyB)) % 26 + 65;
            result += String.fromCharCode(decryptedCharCode);
          } else if (charCode >= 97 && charCode <= 122) { // lowercase letters
            const decryptedCharCode = (modInvA * (charCode + 26 - 97 + keyB)) % 26 + 97;
            result += String.fromCharCode(decryptedCharCode);
          } else {
            result += str[i];
          }
        }
        return result;
      };
      const decryptedLastName = affineDecrypt(lastName);
      const decryptedFirstName = affineDecrypt(firstName);
      return {
        id,
        keyA,
        keyB,
        lastName: decryptedLastName,
        firstName: decryptedFirstName,
        middleName,
        gender,
        birthdate,
        hobbies,
        address,
        zip,
        civilStatus,
      };
    });
    res.render('index', { title: 'Express', datas: datas });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
};

function findModInverse(a, m) {
  const g = gcd(a, m);
  if (g !== 1) {
    throw new Error('Inverse does not exist.');
  }
  return mod(a, m);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function gcd(keyA, keyB) {
  if (keyB === 0) {
    return keyA;
  } else {
    return gcd(keyB, keyA % keyB);
  }
}

exports.deleteData = async function(req, res) {
  const id = String(req.params.id);

  try {
    const data = await prisma.data.findUnique({
      where: { id: id },
      select: {
        id: true,
        keyA: true,
        keyB: true,
        lastName: true,
        firstName: true,
        middleName: true,
        gender: true,
        birthdate: true,
        hobbies: true,
        address: true,
        zip: true,
        civilStatus: true,
      },
    });
    
    if (!data) {
      return res.status(404).send(`Data with ID ${id} not found`);
    }
    
    await prisma.data.delete({
      where: {
        id: id
      }
    });
    
    res.send(`Data with ID ${id} has been deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
}