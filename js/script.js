// Sample data
const server_data = {
    collection: {
        title: "Movie List",
        type: "movie",
        version: "1.0",

        items: [
            {
                href: "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings_(film_series)",
                data: [
                    { name: "name", value: "The Lord of the Rings", prompt: "Name" },
                    { name: "description", value: "The Lord of the Rings is a film series consisting of three high fantasy adventure films directed by Peter Jackson. They are based on the novel The Lord of the Rings by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003). They are a New Zealand-American venture produced by WingNut Films and The Saul Zaentz Company and distributed by New Line Cinema.", prompt: "Description" },
                    { name: "director", value: "Peter Jackson", prompt: "Director" },
                    { name: "datePublished", value: "2001-12-19", prompt: "Release Date" }
                ]
            },
            {
                href: "https://en.wikipedia.org/wiki/The_Hunger_Games_(film_series)",
                data: [
                    { name: "name", value: "The Hunger Games", prompt: "Name" },
                    { name: "description", value: "The Hunger Games film series consists of four science fiction dystopian adventure films based on The Hunger Games trilogy of novels, by the American author Suzanne Collins. Distributed by Lionsgate and produced by Nina Jacobson and Jon Kilik, it stars Jennifer Lawrence as Katniss Everdeen, Josh Hutcherson as Peeta Mellark, Woody Harrelson as Haymitch Abernathy, Elizabeth Banks as Effie Trinket, Philip Seymour Hoffman as Plutarch Heavensbee, Stanley Tucci as Caesar Flickerman, Donald Sutherland as President Snow, and Liam Hemsworth as Gale Hawthorne. Gary Ross directed the first film, while Francis Lawrence directed the next three films.", prompt: "Description" },
                    { name: "director", value: "Gary Ross", prompt: "Director" },
                    { name: "datePublished", value: "2012-03-12", prompt: "Release Date" }
                ]
            },
            {
                href: "https://en.wikipedia.org/wiki/Game_of_Thrones",
                data: [
                    { name: "name", value: "Game of Thrones", prompt: "Name" },
                    { name: "description", value: "Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss. It is an adaptation of A Song of Ice and Fire, George R. R. Martin's series of fantasy novels, the first of which is A Game of Thrones. It is filmed in Belfast and elsewhere in the United Kingdom, Canada, Croatia, Iceland, Malta, Morocco, Spain, and the United States. The series premiered on HBO in the United States on April 17, 2011, and its seventh season ended on August 27, 2017. The series will conclude with its eighth season premiering in 2019.", prompt: "Description" },
                    { name: "director", value: "Alan Taylor et al", prompt: "Director" },
                    { name: "datePublished", value: "2011-04-17", prompt: "Release Date" }
                ]
            }
        ]
    }
};

// Componente edit-form
const EditForm = Vue.defineComponent({
    props: {
        itemdata: {
            type: Array,
            required: true
        },
        index: {
            type: Number,
            required: false
        }
    },
    methods: {
        closeForm() {
            this.$emit('formClosed');
        }
    }, template: `
    <div>
        <h2>Edit Form</h2>
        <form>
        <div 
            v-for="(field, idx) in itemdata" 
            :key="field.name" 
            class="mb-3"
        >
            <label 
            :for="'field-' + (index !== undefined ? index : 0) + '-' + field.name" 
            class="form-label"
            >
            {{ field.prompt }}
            </label>
            <input 
            type="text" 
            class="form-control" 
            :id="'field-' + (index !== undefined ? index : 0) + '-' + field.name" 
            v-model="field.value"
            >
        </div>
        <button type="button" class="btn btn-secondary" @click="closeForm">Cerrar</button>
        </form>
    </div>
    `
});

// Componente item-data
const ItemData = Vue.defineComponent({
    props: {
        item: {
        type: Object,
        required: true
        },
        index: {
        type: Number,
        required: false
        }
    },
    data() {
        return {
        editing: false
        };
    },
    methods: {
        toggleEditFormVisibility() {
        this.editing = !this.editing;
        }
    },
    template: `
        <div>
        <div v-if="!editing">
            <dl>
            <template v-for="field in item.data" :key="field.name">
                <dt>{{ field.prompt }}</dt>
                <dd>{{ field.value }}</dd>
            </template>
            </dl>
            <a 
            :href="item.href" 
            class="btn btn-primary" 
            target="_blank"
            >
            Ver
            </a>
            <button 
            class="btn btn-secondary ms-2" 
            @click="toggleEditFormVisibility"
            >
            Editar
            </button>
        </div>
        <div v-else>
            <edit-form 
            :itemdata="item.data" 
            :index="index" 
            @formClosed="toggleEditFormVisibility"
            ></edit-form>
        </div>
        </div>
    `
});

// Crear la aplicación Vue
const app = Vue.createApp({
    data() {
        return { 
        col: server_data
        };
    }
});

// Registrar los componentes globalmente
app.component('edit-form', EditForm);
app.component('item-data', ItemData);

// Montar la aplicación en el elemento con id 'app'
app.mount('#app');