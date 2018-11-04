import './style.scss';
import users from './data';
import {createStore} from 'redux';

// ** Here you can pass store down to your components
// ** and initialize them, like in example below

// ** import {createStore} from 'redux';
// ** import myTestReducer from './reducers/my_test_reducer.js';
// ** import MyTestComponent from './components/my_test_component';

// ** const store = createStore(myTestReducer);

// ** const testComponent = new MyTestComponent(store);

// ** testComponent.init()

const initialState = {
    filter: '',
    users: [],
    filteredUsers: [],
    visibleUsers: [],
    usersToShow: 5
};

function userStore(state = initialState, action) {
    switch (action.type) {
    case 'RECEIVE_USERS':
        return handleReceive();
    case 'REMOVE_USER':
        return handleRemove();
    case 'FILTER_USERS':
        return handleFilter();
    case 'LOAD_MORE':
        return handleShowMore();
    default:
        return state;
    }

    function handleReceive() {
        return Object.assign({}, state, {
            users: action.users,
            filteredUsers: action.users,
            visibleUsers: action.users.slice(0, state.usersToShow)
        });
    }

    function handleRemove() {
        let usersWithoutRemovedUser = state.users.filter((u) => u.id !== action.userId);
        let filteredUsers = usersWithoutRemovedUser.filter((u) => filterByName(u, state.filter));

        return Object.assign({}, state, {
            users: usersWithoutRemovedUser,
            filteredUsers: filteredUsers,
            visibleUsers: filteredUsers.slice(0, state.usersToShow),
        });
    }

    function handleFilter() {
        let filteredUsers = state.users.filter((u) => filterByName(u, action.filter));
        return Object.assign({}, state, {
            filteredUsers: filteredUsers,
            visibleUsers: filteredUsers.slice(0, state.usersToShow),
            filter: action.filter
        });
    }

    function handleShowMore() {
        const usersToShowIncrement = 5;
        const usersToShow = state.usersToShow + usersToShowIncrement;
        let filteredUsers = state.users.filter((u) => filterByName(u, state.filter));

        return Object.assign({}, state, {
            filteredUsers: filteredUsers,
            visibleUsers: filteredUsers.slice(0, usersToShow),
            usersToShow: usersToShow
        });
    }

    function filterByName(user, filter) {
        return user.name.toLowerCase().includes(filter.toLowerCase());
    }
}

let store = createStore(userStore);
store.dispatch({type: 'RECEIVE_USERS', users: users});

store.subscribe(renderView);


let tableContainer = document.getElementsByClassName('contact-information')[0];
let nameFilter = document.getElementById('name');

nameFilter.addEventListener('input', function() {
    let filterValue = nameFilter.value;
    store.dispatch({type: 'FILTER_USERS', filter: filterValue});
});

let loadMoreBtn = document.getElementsByClassName('load-more-btn')[0];
loadMoreBtn.addEventListener('click', function() {
    store.dispatch({type: 'LOAD_MORE'});
});

let footerCountLabel = document.getElementsByClassName('count-users-dispay')[0];

function renderView() {
    let state = store.getState();
    tableContainer.innerHTML = '';

    let table = createTable();

    if (state.filteredUsers.length > 0) {
        for (let i = 0; i < state.visibleUsers.length; i++) {
            renderRow(table, state.visibleUsers[i]);
        }
    } else {
        renderNotFound();
    }

    renderFooter();

    function renderNotFound() {
        let notFoundElement = document.createElement('h1');
        notFoundElement.innerText = 'No user are found';
        tableContainer.appendChild(notFoundElement);
    }

    function renderFooter() {
        let footerText = `Displayed ${state.visibleUsers.length} out of ${state.filteredUsers.length}`;
        footerCountLabel.innerText = footerText;

        if (state.visibleUsers.length !== state.filteredUsers.length) {
            loadMoreBtn.classList.remove('invisible');
        } else {
            loadMoreBtn.classList.add('invisible');
        }
    }

    function renderRow(table, user) {
        let row = document.createElement('tr');
        let cells = `
            <td><img src="${user.picture}"</td>
            <td>${user.name}</td>
            <td>${user.location}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.timezone}</td>
            <td><button class="remove-btn">Remove</button></td>
            `;
        row.innerHTML = cells;

        let $removeBtn = row.getElementsByClassName('remove-btn')[0];
        $removeBtn.addEventListener('click', function() {
            store.dispatch({type: 'REMOVE_USER', userId: user.id});
        });

        table.appendChild(row);
    }
    function createTable() {
        let table = document.createElement('table');
        tableContainer.appendChild(table);
        const header = `<tr class="table-header">
                    <td>Photo</td>
                    <td>Name</td>
                    <td>Address</td>
                    <td>Email</td>
                    <td>Phone number</td>
                    <td>Timezone</td>
                    <td>Actions</td>
                </tr>`;
        table.innerHTML = header;
        let tableBody = table.querySelectorAll('tbody')[0];
        return tableBody;
    }
}

renderView();
