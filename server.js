const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const menus = [
    {
        id: "1",
        menu: {
            Js: [
                {
                    name: "Introduction to JavaScript",
                    link: "http://example.com/js-intro"
                },
                {
                    name: "Advanced JavaScript",
                    idLink: 2
                }
            ],
            java: null,
            python: {
                video: "http://example.com/python-video",
                article: "http://example.com/python-article"
            }
        }
    },
    {
        id: "2",
        menu: {
            Js: [
                {
                    name: "JavaScript Basics",
                    link: "http://example.com/js-basics"
                },
                {
                    name: "JavaScript Design Patterns",
                    idLink: 3
                }
            ],
            java: "http://example.com/java",
            python: {
                video: "http://example.com/python-advanced-video",
                article: "http://example.com/python-advanced-article"
            }
        }
    }
];

// Маршрути

// Отримати всі меню
app.get('/menus', (req, res) => {
    res.json(menus);
});

app.get('/menus/:id', (req, res) => {
    const { id } = req.params;
    res.json(menus.find(e => e.id == id));
});

// Створити нове меню
app.post('/menus', (req, res) => {
    const newMenu = req.body;
    newMenu.id = menus.length + 1; // Додавання id до нового меню
    menus.push(newMenu);
    res.status(201).json(newMenu);
});

// Оновити меню за id
app.put('/menus/:id', (req, res) => {
    const { id } = req.params;
    const updatedMenu = req.body;

    let menuIndex = menus.findIndex(menu => menu.id === parseInt(id));
    if (menuIndex !== -1) {
        menus[menuIndex] = { ...menus[menuIndex], ...updatedMenu };
        res.json(menus[menuIndex]);
    } else {
        res.status(404).json({ message: 'Menu not found' });
    }
});

// Видалити меню за id
app.delete('/menus/:id', (req, res) => {
    const { id } = req.params;
    const menuIndex = menus.findIndex(menu => menu.id === parseInt(id));
    if (menuIndex !== -1) {
        const deletedMenu = menus.splice(menuIndex, 1);
        res.json(deletedMenu);
    } else {
        res.status(404).json({ message: 'Menu not found' });
    }
});

// Запуск серверу
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
