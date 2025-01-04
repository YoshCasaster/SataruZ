import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'kaelith',
    name: 'Kaelith Stormrune',
    image: 'https://i.pinimg.com/736x/1b/c8/4c/1bc84c7e087cc0b5b15e55cd0ad43f66.jpg',
    gender: 'Laki-laki',
    role: 'Ksatria Terbuang',
    description: 'Mantan komandan kerajaan yang kini menjadi petualang bebas. Memiliki pedang rune dan bekas luka besar di wajahnya.',
    personality: 'Tegas, melankolis, setia',
    stats: {
      strength: 85,
      defense: 90,
      hp: 1200
    }
  },
  {
    id: 'alyndra',
    name: 'Alyndra Moonveil',
    image: 'https://i.pinimg.com/736x/04/22/e2/0422e2798a4e55edc87b1f63adc01223.jpg',
    gender: 'Perempuan',
    role: 'Penyihir Misterius',
    description: 'Penyihir dari lembah tersembunyi, memegang tongkat sihir bercahaya bulan.',
    personality: 'Bijaksana, tenang, misterius',
    stats: {
      strength: 70,
      defense: 60,
      hp: 900,
      mana: 500
    }
  },
  {
    id: 'rydan',
    name: 'Rydan Greythorn',
    image: 'https://i.pinimg.com/736x/40/b9/73/40b973523224f513e775a9730b4ef8f6.jpg',
    gender: 'Laki-laki',
    role: 'Pencuri Cerdas',
    description: 'Pencuri ulung yang terkenal karena kecerdikan dan kemampuannya menyelinap.',
    personality: 'Humoris, berjiwa bebas, suka menggoda',
    stats: {
      strength: 60,
      defense: 50,
      hp: 800,
      speed: 95
    }
  }
];