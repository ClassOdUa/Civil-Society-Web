var LOCALE_ARRAY = [{selector: '#main-page .ui-title', en: 'Log in', ru: 'Вход', ua: 'Вхід'},/*inner html*/
{selector: '#main-page .ui-input-text [name=login]', value: 'placeholder', en: 'Login', ru: 'Логин', ua: 'Логін'},/*placeholder*/
{selector: '#main-page .ui-input-text [name=pass]', value: 'placeholder', en: 'Password', ru: 'Пароль', ua: 'Пароль'},/*placeholder*/
{selector: '#main-page .ui-btn.ui-corner-all.ui-btn-inherit.ui-btn-icon-left', en: 'Remember me', ru: 'Запомнить меня', ua: 'Запам\'ятати мене'},/*inner html*/
{selector: '#main-page .btn-login .ui-btn.ui-shadow.ui-corner-all',	 en: 'Log In', ru: 'Войти', ua: 'Ввійти'},/*inner html*/
{selector: '#main-page .ui-btn.ui-btn-inline.ui-corner-all.ui-btn-reg', en: 'Registration', ru: 'Регистрация', ua: 'Реєстрація'},/*inner html*/
{selector: '#main-page .ui-btn.ui-btn-inline.ui-corner-all.ui-btn-pass', en: 'Forgot password', ru: 'Забыли пароль', ua: 'Забули пароль'},/*inner html*/
{selector: '#main-page .btn-login-soc .ui-btn.ui-shadow.ui-corner-all', en: 'LOG IN BY SOCIAL NETWORKS', ru: 'ВХОД С ПОМОЩЬЮ СОЦИАЛЬНЫХ СЕТЕЙ', 
	ua: 'ВХІД ЗА ДОПОМОГОЮ СОЦІАЛЬНИХ МЕРЕЖ'},/*inner html*/
{selector: '#main-page .social-wrap .title', en: 'Sign in by social Networks', ru: 'Войти с помощью социальных сетей', 
	ua: 'Ввійти за допомогою соціальних мереж'},/*inner html*/
{selector: '#registration .ui-title', en: 'Registration', ru: 'Регистрация', ua: 'Реєстрація'},/*inner html*/
{selector: '#registration .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: 'Сохранить', ua: 'Зберегти'},/*inner html*/
{selector: '#registration #register-form .text-field label:eq(0)', 
	en: 'Username (only letters and numbers, 2 to 64 characters)', 
	ru: 'Имя пользователя(только буквы и числа, 2-64 символа)', 
	ua: 'Ім\'я користувача(тільки літери та числа, 2-64 символа)'},/*inner html*/
{selector: '#registration #register-form .text-field label:eq(1)', 
	en: 'First name (only letters,2 to 64 characters)', 
	ru: '', 
	ua: ''},/*inner html*/
{selector: '#registration #register-form .text-field label:eq(2)', 
	en: 'Last name (only letters,2 to 64 characters)', 
	ru: '', 
	ua: ''},/*inner html*/
{selector: '#registration #register-form [name=username]', value: 'placeholder', en: 'User', ru: 'Пользователь', ua: 'Користувач'},/*placeholder*/
{selector: '#registration #register-form .text-field label:eq(3)', 
	en: 'User`s email (please provide a real email address, you`ll get a verification mail with an activation link)', 
	ru: 'Электронный адрес(пожалуйста, предоставьте реальный email, вы сможете подтвердить адрес с помощью ссылки активации)', 
	ua: 'Электронна адреса(будь ласка, введіть реальный email, ви зможете підтвердити адресу за допомогою посилання активации)'},/*inner html*/
{selector: '#registration #register-form [name=email]', value: 'placeholder', en: 'Email', ru: 'Email', ua: 'Email'},/*placeholder*/
{selector: '#registration #register-form .text-field label:eq(4)', 
	en: 'Password (min. 6 characters!)', 
	ru: 'Пароль(минимум 6 символов)', 
	ua: 'Пароль(мінімум 6 символів)'},/*inner html*/
{selector: '#registration #register-form [name=password]', value: 'placeholder', en: 'qwerty', ru: 'йцукен', ua: 'йцукен'},/*placeholder*/
{selector: '#registration #register-form .text-field label:eq(5)', 
	en: 'Password repeat', 
	ru: 'Повторите пароль', 
	ua: 'Повторіть пароль'},/*inner html*/
{selector: '#registration #register-form [name=password_r]', value: 'placeholder', en: 'qwerty', ru: 'йцукен', ua: 'йцукен'},/*placeholder*/
{selector: '#registration #register-form .text-field label:eq(6)', 
	en: 'Please enter these characters', 
	ru: 'Пожалуйста, введите эти символы', 
	ua: 'Будь ласка, введіть ці символи'},/*inner html*/
{selector: '#registration .ui-btn.ui-btn-corner-all.ui-shadow', value: 'value', en: 'Register', ru: 'Зарегистрироваться', ua: 'Зареєструватись'},/*value*/
{selector: '#forgot-password .text-field > label', 
	en: 'Enter your login to restore access',
 	ru: 'Введите ваш логин, чтобы восстановить доступ', 
 	ua: 'Введіть ваш логін, щоб відновити доступ'},/*inner html*/
{selector: '#forgot-password .ui-title', en: 'Forgot password', ru: 'Забыли пароль', ua: 'Забули пароль'},/*inner html*/
{selector: '#forgot-password .ui-input-text > input', value: 'placeholder', en: 'Username', ru: 'Имя пользователя', ua: 'Ім\'я користувача'},/*placeholder*/
{selector: '#forgot-password .ui-btn.ui-btn-corner-all.ui-shadow', value: 'value', en: 'Restore access', ru: 'Восстановить доступ', ua: 'Відновити доступ'},/*value*/
{selector: '#news-page .ui-title', en: 'News', ru: 'Новости', ua: 'Новини'},/*inner html*/
{selector: '#news-page .author > span', en: 'news by', ru: '', ua: ''},/*inner html*/
{selector: '#news-page #news-help .title', en: 'Description', ru: '', ua: ''},/*inner html*/
{selector: '#news-page #news-help .text', en: '', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page .ui-title', en: 'Decision-making', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page .count > span', en: 'Suported', ru: 'Голосов поддержки', ua: ''},/*inner html*/
{selector: '#votings-page .total-count > span', en: '', ru: 'Общее количество голосов', ua: ''},/*inner html*/
{selector: '#votings-page #voting-help .title', en: 'Description', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page #voting-help .text', en: 'Help', ru: 'Help', ua: 'Help'},/*inner html*/
{selector: '#trust-help .title', en: 'Description', ru: '', ua: ''},/*inner html*/
{selector: '#trust-help .text', en: '', ru: '', ua: ''},/*inner html*/
{selector: '#trust-list .ui-title', en: 'Trust list', ru: '', ua: ''},/*inner html*/
{selector: '#trust-list .ui-btn.ui-btn-inherit.ui-btn-icon-left', en: 'Trust list', ru: '', ua: ''},/*inner html*/
{selector: '#trust-list #select-31-button > span', en: 'Choose vote type', ru: '', ua: ''},/*inner html*/
{selector: '#trust-list .ui-block-a .ui-btn.ui-corner-all', en: 'Trust vote', ru: '', ua: ''},/*inner html*/
{selector: '#options-page .ui-title', en: 'Options', ru: '', ua: ''},/*inner html*/
{selector: '#options-page .ui-btn.ui-btn-inherit.ui-btn-icon-right.ui-first-child.ui-last-child', 
	en: 'Specify the address for gps', ru: '', ua: ''},/*inner html*/
{selector: '#options-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .ui-title', en: 'Edit Profile', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .login > span:eq(0)', en: 'Login: ', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .add-address .title', en: 'Add up to three address to recieve acces to voting of your regions', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .ui-btn.ui-btn-icon-right[href=#edit-address]', en: 'Address', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .social-wrap .title', en: 'Sign in by social Networks to increace your authorisation status', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page #change-password > label', en: 'Change password here', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page [name=first_name]', value: 'placeholder', en: 'First name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=last_name]', value: 'placeholder', en: 'Last name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=password]', value: 'placeholder', en: 'Enter new password', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=repeat_password]', value: 'placeholder', en: 'Accept password', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page .ui-controlgroup-label > legend', en: 'Enter your date of birth', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) > span', en: 'January', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(0)', en: 'January', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(1)', en: 'February', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(2)', en: 'March', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(3)', en: 'April', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(4)', en: 'May', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(5)', en: 'June', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(6)', en: 'July', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(7)', en: 'August', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(8)', en: 'Ceptember', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(9)', en: 'October', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(10)', en: 'November', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page  .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow:eq(1) select option:eq(11)', en: 'December', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .text-field:eq(1) > label', en: 'Add url of your avatar', ru: '', ua: ''},/*inner html*/
{selector: '#edit-address .ui-title', en: 'Edit Address', ru: '', ua: ''},/*inner html*/
{selector: '#edit-address .btn-next-page .title', 
	en: 'Add up to three address to recieve acces to voting of your regions', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .ui-link > span', en: 'Deactivate', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .active.ui-link > span', en: 'Activate', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-title', en: 'Edit Address 1', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-btn.ui-corner-all.ui-shadow', en: 'Find an address using GPS', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(0) > label', en: 'Country', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(1) > label', en: 'State', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(2) > label', en: 'County', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(3) > label', en: 'City', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(4) > label', en: 'Index', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(5) > label', en: 'Street', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(6) > label', en: 'Number of House', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-content form > div:eq(7) > label', en: 'Add some comments', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .ui-btn.ui-btn-inherit.ui-btn-icon-left', en: 'Address official registration', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .btn-save.ui-btn.ui-shadow.ui-corner-all', en: 'Save address', ru: '', ua: ''},/*inner html*/
{selector: '#address-item .btn-delete.ui-btn.ui-shadow.ui-corner-all', en: 'Delete address', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-profile', en: 'Profile', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-news', en: 'News', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-votings', en: 'Decision-making', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-vote', en: 'My votes', ru: '', ua: ''},/*inner html DELETE*/
{selector: '#left-panel .menu-icon-trust', en: 'Trust list', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-vote', en: 'My votes', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-funds', en: 'Funds', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-programs', en: 'Social Investment', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-projects', en: 'Social Entrepreneurship', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-logout', en: 'Logout', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-help', en: 'Help', ru: '', ua: ''},/*inner html*/
{selector: '#left-panel .menu-icon-options', en: 'Options', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page [aria-owns=change-password]', en: 'Change password here', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .btn-next-page .title', en: 'Select sphere which are interest you', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page [href=#spheres-address]', en: 'Choose sphere', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page .text-field > label:eq(0)', en: 'Your name and last name', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page #male', en: 'Male', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page #female', en: 'Female', ru: '', ua: ''},/*inner html*/
{selector: '#profile-page #change_pass_button', en: 'Save', ru: '', ua: ''},/*inner html*/
{selector: '#my-votings-page .ui-title', en: 'My Votes', ru: '', ua: ''},/*inner html*/
{selector: '#trust-list #choose_sphere_trust-button span', en: 'Choose vote type', ru: '', ua: ''},/*inner html*/
{selector: '#my-votings-page [href=#create-vote]', en: 'Create vote', ru: 'Создать голосование', ua: ''},/*inner html*/
{selector: '#create-vote .ui-title', en: 'Create vote', ru: 'Создать голосование', ua: ''},/*inner html*/
{selector: '#create-vote .text-field:eq(0) > label', en: 'Name your voting*', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .text-field:eq(1) > label', en: 'Description*', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .text-field:eq(2) > label', en: '', ru: 'Минимальное кол-во голосов поддержки для начала голосования.', ua: ''},/*inner html*/
{selector: '#create-vote .jqte_placeholder_text', en: 'Write your description here', ru: '', ua: ''},/*inner html*/
{selector: '#spheres-address .ui-btn.ui-input-btn.ui-corner-all.ui-shadow', en: 'Save', ru: '', ua: ''},/*inner html*/
{selector: '#spheres-address .ui-title:eq(0)', en: 'Spheres', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .ui-input-file > span', en: 'Upload avatar of your vote*', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .date-group.ui-controlgroup.ui-controlgroup-horizontal.ui-corner-all:eq(0) legend', 
	en: 'Enter first date of vote', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .date-group.ui-controlgroup.ui-controlgroup-horizontal.ui-corner-all:eq(1) legend', 
	en: 'Enter last date of vote', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .checkbox-group.ui-controlgroup.ui-controlgroup-vertical.ui-corner-all legend', 
	en: 'Choose status of authorisation', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote #v0', en: 'Email', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote #v1', en: 'Social Network', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote #v2', en: 'By payment', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote #v3', en: 'By passport', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote #v4', en: 'Community', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote #v5', en: 'Сo-owners', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .text-field:eq(2) label', en: 'Need supporters to start voting', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .select-group.ui-controlgroup.ui-controlgroup-horizontal.ui-corner-all legend',
	en: 'Enter age members who can vote', ru: '', ua: ''},/*inner html*/
{selector: '#create-vote .ui-btn.ui-input-btn.ui-corner-all.ui-shadow:eq(0)', en: 'Create Vote', ru: '', ua: ''},/*inner html*/
{selector: '#edit-address .ui-title', en: 'Edit Address', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 .ui-title', en: 'Edit Address1', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 #findgps-1', en: 'Find an address using', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 form label:eq(0)', en: 'Country', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 form label:eq(1)', en: 'State', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 form label:eq(2)', en: 'County', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 form label:eq(3)', en: 'City', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 form label:eq(4)', en: 'Index', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 form label:eq(5)', en: 'Street', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 form label:eq(6)', en: 'Number of house', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 form label:eq(7)', en: 'Add some comments', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 .ui-checkbox label', en: 'Address official registration', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 .btn-save', en: 'Save address', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-1 .btn-delete', en: 'Delete address', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 .ui-title', en: 'Edit Address2', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 #findgps-2', en: 'Find an address using', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 form label:eq(0)', en: 'Country', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 form label:eq(1)', en: 'State', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 form label:eq(2)', en: 'County', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 form label:eq(3)', en: 'City', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 form label:eq(4)', en: 'Index', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 form label:eq(5)', en: 'Street', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 form label:eq(6)', en: 'Number of house', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 form label:eq(7)', en: 'Add some comments', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 .ui-checkbox label', en: 'Address official registration', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 .btn-save', en: 'Save address', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-2 .btn-delete', en: 'Delete address', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 .ui-title', en: 'Edit Address3', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 .ui-btn-right.ui-btn.ui-icon-check.ui-btn-icon-right', en: 'Save', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 #findgps-3', en: 'Find an address using', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 form label:eq(0)', en: 'Country', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 form label:eq(1)', en: 'State', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 form label:eq(2)', en: 'County', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 form label:eq(3)', en: 'City', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 form label:eq(4)', en: 'Index', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 form label:eq(5)', en: 'Street', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 form label:eq(6)', en: 'Number of house', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 form label:eq(7)', en: 'Add some comments', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 .ui-checkbox label', en: 'Address official registration', ru: '', ua: ''},/*inner html*/
{selector: '#address-item-3 .btn-save', en: 'Save address', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page [name=sort] option:eq(0)', en: 'Sort by newest', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page [name=sort] option:eq(1)', en: 'Sort by stars', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page [name=sort] option:eq(2)', en: 'Sort by supported', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page .ui-input-btn.ui-btn.ui-btn-icon-right.filter-normal span', 
	en: 'Filter', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page #filter_activator span', en: 'Filter is activated', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page .ui-input-btn.ui-btn.ui-btn-icon-right.filter-clear span', 
	en: 'Clear filter', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page .ui-title', en: 'Filter', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page .ui-controlgroup-label:eq(0)', en: 'Enter first date for sort', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page .ui-controlgroup-label:eq(1)', en: 'Enter last date for sort', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page [href=#spheres-filters]', en: 'Choose spheres', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page .filter-save span', en: 'Save filter', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page .filter-clear span', en: 'Clear filter', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page #filter-help .title', en: 'Title', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page #filter-help .text', en: 'This is help', ru: '', ua: ''},/*inner html*/
{selector: '#spheres-filters .ui-title:eq(0)', en: 'Spheres', ru: '', ua: ''},/*inner html*/
{selector: '#votings-page .ui-btn.ui-icon-carat-d.ui-btn-icon-right.ui-corner-all.ui-shadow span', 
	en: 'Sort by newest', ru: '', ua: ''},/*inner html*/
{selector: '#filter-page .ui-title', en: 'Filter', ru: '', ua: ''},/*inner html*/
{selector: '#my-fund-page .long-title', en: 'Personal Funds', ru: 'Personal Funds', ua: 'Personal Funds'},/*inner html*/
{selector: '#my-fund-page .section-title:eq(0)', en: 'Donate Personal Fund', ru: 'Donate Personal Fund', ua: 'Donate Personal Fund'},/*inner html*/
{selector: '#my-fund-page .section-title:eq(1)', en: 'Create Personal Fund', ru: 'Create Personal Fund', ua: 'Create Personal Fund'},/*inner html*/
{selector: '#my-fund-page .select-field:eq(0) label', en: 'Select Fund', ru: 'Select Fund', ua: 'Select Fund'},/*inner html*/
{selector: '#my-fund-page .select-field:eq(1) label', en: 'Select Fund\'s Currency', ru: 'Select Fund\'s Currency', ua: 'Select Fund\'s Currency'},/*inner html*/
{selector: '#my-fund-page .btn-save.ui-btn.ui-shadow.ui-corner-all', 
	en: 'Transfer Donation to Another User', 
	ru: 'Transfer Donation to Another User', 
	ua: 'Transfer Donation to Another User'},/*inner html*/
{selector: '#profile-page [name=user_password_old]', value: 'placeholder', en: 'Enter old password', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=user_password_new]', value: 'placeholder', en: 'Enter new password', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=user_password_repeat]', value: 'placeholder', en: 'Accept password', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=user_password_old]', value: 'placeholder', en: 'Last name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=ln]', value: 'placeholder', en: 'Last name', ru: '', ua: ''},/*placeholder*/
{selector: '#trust-list #searched_string', value: 'placeholder', en: 'Search by ID', ru: '', ua: ''},/*placeholder*/
{selector: '#create-vote [name=name]', value: 'placeholder', en: 'Name', ru: '', ua: ''},/*placeholder*/
{selector: '#create-vote [type=submit]:eq(0)', value: 'value', en: 'Create Vote', ru: '', ua: ''},/*value*/
{selector: '#spheres-address [type=submit]', value: 'value', en: 'Save', ru: '', ua: ''},/*value*/
{selector: '#my-fund-page [type=submit]:eq(0)', value: 'value', en: 'Create Personal Fund Now', ru: 'Create Personal Fund Now', ua: 'Create Personal Fund Now'},/*value*/
{selector: '#votings-page #searched_string', value: 'placeholder', en: 'Search by ID or name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: '', ua: ''},/*placeholder*/
{selector: '#profile-page [name=fn]', value: 'placeholder', en: 'First name', ru: '', ua: ''},/*placeholder*/
];
var LOCALE_ARRAY_ADDITIONAL = { email_not_much:{en: "email_not_Much", ru: "Имейл не совпадает", ua: "Імейл не співпадає"},
active: {en: "active", ru: "Активно", ua: "Активно"},
not_auth: {en: "not auth", ru: "Не авторизирован", ua: "Не авторизованний"},
delete_vote: {en: "Delete vote", ru: "delete_vote", ua: "delete_vote"},
choose_only_one_avatar: {en: "Ypu can choose only one avatar", ru: "Вы можете выбрать только один аватар", ua: "Вы можете выбрати тільки один аватар"},
bad_format_or_size: {en: "Bad format of the file(jpeg and png only) or bigger than 150 kb", ru: "bad_format_or_size", ua: "bad_format_or_size"},
bad_size: {en: "File is larger than the specified amount set", ru: "bad_size_of_file", ua: "bad_size_of_file"},
enter_old_password: {en: "Please, enter old password", ru: "enter_old_password", ua: "enter_old_password"},
enter_new_password: {en: "Please, enter new password", ru: "enter_new_password", ua: "enter_new_password"},
repeat_new_password: {en: "Please, repeat new password", ru: "repeat_new_password", ua: "repeat_new_password"},
old_password_is_wrong: {en: "Your old password is wrong", ru: "old_password_is_wrong", ua: "old_password_is_wrong"},
wrong_password_or_username: {en: "Wrong password or username", ru: "wrong_password_or_username", ua: "wrong_password_or_username"},
user_does_not_exist: {en: "This user does not exist", ru: "user_does_not_exist", ua: "user_does_not_exist"},
password_reset_successfully_sent: {en: "Password reset mail successfully sent!", ru: "password_reset_successfully_sent", ua: "password_reset_successfully_sent"},
wrong_captcha: {en: "Captcha was wrong!", ru: "wrong_captcha", ua: "wrong_captcha"},
account_created: {en: "Your account has been created successfully and we have sent you an email. Please click the VERIFICATION LINK within that mail.", 
	ru: "account_created", ua: "account_created"},
voting_created: {en: "Voting was successfully created", ru: "voting_created",ua: "voting_created"},
gps_not_activated: {en: "GPS not activated", ru: "gps_not_activated", ua: "gps_not_activated"},
type_general_offers: {en: "General offers", ru: "type_general_offers", ua: "type_general_offers"},
type_local_authorities: {en: "Local authorities", ru: "type_local_authorities", ua: "type_local_authorities"},
type_OSMD: {en: "OSMD", ru: "type_OSMD", ua: "type_OSMD"},
type_public_orrganization: {en: "Political Parties, Public organizations", ru: "Political Parties, Public organizations", ua: "Political Parties, Public organizations"},
type_maidan: {en: "Maidan", ru: "type_maidan", ua: "type_maidan"},
type_primaries: {en: "Public primaries", ru: "type_primaries", ua: "type_primaries"},
trust_vote: {en: "Trust vote", ru: "type_general_primaries", ua: "type_general_primaries"},
no_data: {en: "No data with this filter parameters", ru: "Нет данных для этих параметров фильтра", ua: "Немає данних для вибраний параметрів фільтру"},
january: {en: "January", ru: "january", ua: "january"},
february: {en: "February", ru: "february", ua: "february"},
march: {en: "March", ru: "march", ua: "march"},
april: {en: "April", ru: "april", ua: "april"},
may: {en: "May", ru: "may", ua: "may"},
june: {en: "June", ru: "june", ua: "june"},
july: {en: "July", ru: "july", ua: "july"},
august: {en: "August", ru: "august", ua: "august"},
september: {en: "September", ru: "september", ua: "september"},
october: {en: "October", ru: "october", ua: "october"},
november: {en: "November", ru: "november", ua: "november"},
december: {en: "December", ru: "december", ua: "december"},
choose_sphere: {en: "Choose sphere", ru: "choose_sphere", ua: "choose_sphere"},
news_by: {en: "news by", ru: "news_by", ua: "news_by"},
support: {en: "Support", ru: "support", ua: "support"},
not_support: {en: "Not support", ru: "not_support", ua: "not_support"},
collect_supporters: {en: "collect_supporters ", ru: "collect_supporters ", ua: "Збирає прихильників "},
supporters: {en: "supporters", ru: "Голосов поддержки", ua: "supporters"},
time_voting: {en: "time_voting", ru: "time_voting", ua: "Триває"},
all_voters: {en: "all_voters", ru: "Общее количество голосов", ua: "all_voters"},
voting_finished: {en: "voting_finished", ru: "voting_finished", ua: "Голосування завершено"},
voting_canceled: {en: "voting_canceled", ru: "voting_canceled", ua: "Голосування відхилено"},
description: {en: "Description", ru: "description", ua: "description"},
help_collect_supports_or_canceled: {en: "help_collect_supports_or_canceled", ru: "help_collect_supports_or_canceled", ua: "help_collect_supports_or_canceled"},
share: {en: "Share", ru: "share", ua: "share"},
number_of_votes_support: {en: "Number of votes support", ru: "number_of_votes_support", ua: "number_of_votes_support"},
discussion_of_voting: {en: "Discussion of voting", ru: "discussion_of_voting", ua: "discussion_of_voting"},
yes_no_i_do_not_know: {en: "Vote yes, no or i don’t know:", ru: "yes_no_i_do_not_know:", ua: "yes_no_i_do_not_know:"},
yes: {en: "Yes", ru: "yes", ua: "yes"},
abstain: {en: "Abstain", ru: "abstain", ua: "abstain"},
no: {en: "No", ru: "no", ua: "no"},
turn_to_open_anonymous: {en: "Turn on open (not anonymous) vote", ru: "turn_to_open_anonymous", ua: "turn_to_open_anonymous"},
you_have_selected: {en: "You have selected ", ru: "you_have_selected ", ua: "you_have_selected "},
anonymous: {en: "Anonymous", ru: "anonymous", ua: "anonymous"},
not_anonymus: {en: "Not anonymus", ru: "not_anonymus", ua: "not_anonymus"},
anonymus: {en: "Anonymus", ru: "anonymus", ua: "anonymus"},
help_voting_period_finished: {en: "help_voting_period_finished", ru: "help_voting_period_finished", ua: "help_voting_period_finished"},
by: {en: "By ", ru: "by ", ua: "by "},
sphere: {en: "Sphere", ru: "sphere", ua: "sphere"},
share_by_social_newtworks: {en: "Share by social Networks", ru: "share_by_social_newtworks", ua: "share_by_social_newtworks"},
result_of_votes: {en: "Results of votes", ru: "result_of_votes", ua: "result_of_votes"},
number_of_voters: {en: "Number of Voters", ru: "number_of_voters", ua: "number_of_voters"},
auth_by_email: {en: "Auth by email", ru: "auth_by_email", ua: "auth_by_email"},
social_network: {en: "Social Network", ru: "social_network", ua: "social_network"},
by_payment: {en: "By payment", ru: "by_payment", ua: "by_payment"},
by_passport: {en: "By passport", ru: "by_passport", ua: "by_passport"},
community: {en: "Community", ru: "community", ua: "community"},
co_owners: {en: "Сo-owners", ru: "co_owners", ua: "co_owners"},
view_list_public_voters: {en: "View the list of public voters", ru: "view_list_public_voters", ua: "view_list_public_voters"},
voters: {en: "Voters", ru: "voters", ua: "voters"},
back: {en: "Back", ru: "back", ua: "back"},
ask: {en: "Ask", ru: "ask", ua: "ask"},
help_voters_list: {en: "help_voters_list", ru: "help_voters_list", ua: "help_voters_list"},
clear_text: {en: "Clear text", ru: "clear_text", ua: "clear_text"},
activate: {en: "Activate", ru: "activate", ua: "activate"},
deactivate: {en: "Deactivate", ru: "deactivate", ua: "deactivate"},
please_enter_name_voting: {en: "Please enter name of your voting", ru: "please_enter_name_voting", ua: "please_enter_name_voting"},
please_enter_description_voting: {en: "Please enter description of your voting", ru: "please_enter_description_voting", ua: "please_enter_description_voting"},
please_enter_sphere_voting: {en: "Please choose sphere of your voting", ru: "please_enter_sphere_voting", ua: "please_enter_sphere_voting"},
please_enter_image_voting: {en: "Please choose image of your voting", ru: "please_enter_image_voting", ua: "please_enter_image_voting"},
please_enter_supporters_voting: {en: "Please enter count of needle supporters for your voting", ru: "please_enter_supporters_voting", ua: "please_enter_supporters_voting"},
collect_cash: {en: "collect_cash", ru: "collect_cash", ua: "Сбор средств"},
collect_cash_to: {en: "Collect cash to", ru: "Сбор средств до", ua: "Сбор средств до"},
amount_asking: {en: "amount_asking", ru: "amount_asking", ua: "Нужное количество средств"},
amount_current: {en: "amount_current", ru: "amount_current", ua: "Собрано на данный момент"},
my_cash: {en: "my_cash", ru: "my_cash", ua: "Мой вклад"},
count_contractors: {en: "count_contractors", ru: "count_contractors", ua: "Количество подрядчиков"},
successfully_finished: {en: "successfully_finished", ru: "Успешно ", ua: "завершенsuccessfully_finished"},
donate_successfull: {en: "Donate successfull", ru: "Пожертвование выполнено успешно", ua: "donate_successfull"},
warning_donate: {en: "У вас нет возможности поддержать в этой валюте. Создайте фонд в этой валюте и зачислите средства.", 
	ru: "У вас нет возможности поддержать в этой валюте. Создайте фонд в этой валюте и зачислите средства.", 
	ua: "У вас нет возможности поддержать в этой валюте. Создайте фонд в этой валюте и зачислите средства."},
saved_successfull: {en: "Saved successfull", ru: "saved_successfull", ua: "saved_successfull"},
no_pif_history: {en: "Empty", ru: "Empty", ua: "Empty"},
weighted_vote: {en: "Weighted voting", ru: "Weighted vote", ua: "Weighted vote"},
vote: {en: "Voting", ru: "Vote", ua: "Vote"},
my_vote: {en: "My voting", ru: "my_vote", ua: "my_vote"},
project: {en: "Project", ru: "project", ua: "project"},
program: {en: "Program", ru: "program", ua: "program"},
request: {en: "Request", ru: "request", ua: "request"},
project_proposition: {en: "Project proposition", ru: "Project proposition", ua: "Project proposition"},
create_weighted_vote: {en: "Create weighted voting", ru: "Create weighted vote", ua: "Create weighted vote"},
create_project_proposition: {en: "Create project proposition", ru: "Create project proposition", ua: "Create project proposition"},
create_project: {en: "Create project", ru: "Create project", ua: "Create project"},
create_program: {en: "Create program", ru: "Create program", ua: "Create program"},
create_request: {en: "Create request", ru: "Create request", ua: "Create request"},
name_of_your_weighted_vote: {en: "Name of your weighted voting", ru: "Name of your weighted vote", ua: "Name of your weighted vote"},
name_of_your_project_proposition: {en: "Name of your project proposition", ru: "Name of your project proposition", ua: "Name of your project proposition"},
name_of_your_project: {en: "Name of your project", ru: "Name of your project", ua: "Name of your project"},
name_of_your_program: {en: "Name of your program", ru: "Name of your program", ua: "Name of your program"},
name_of_your_request: {en: "Name of your request", ru: "Name of your request", ua: "Name of your request"},
transaction_okay: {en: "Transaction successfull", ru: "Transaction successfull", ua: "Transaction successfull"},
create_fund_question: {en: " Are you sure want to create new Personal Fund?", 
	ru: " Are you sure want to create new Personal Fund?", 
	ua: " Are you sure want to create new Personal Fund?"},
transaction_question: {en: "Are you sure want to donate this user? Presonal Donations are not returneble", 
	ru: "Are you sure want to donate this user? Presonal Donations are not returneble", 
	ua: "Are you sure want to donate this user? Presonal Donations are not returneble"},
return_donate_successfull: {en: "Return donate successfull", ru: "return_donate_successfull", ua: "return_donate_successfull"},
votings_by_sphere: {en: "Votings by spheres", ru: "votings_by_sphere", ua: "votings_by_sphere"},
local_self_goverments_indicative: {en: "Local self-governments indicative", ru: "local_self_goverments_indicative", ua: "local_self_goverments_indicative"},
elections: {en: "Elections", ru: "elections", ua: "elections"},
candidates_proposal: {en: "Candidates\' rating (Public proposal)", ru: "candidates_proposal", ua: "candidates_proposal"},
candidates_parties: {en: "Candidates\' rating (Political Parties)", ru: "candidates_parties", ua: "candidates_parties"},
local_self_goverments: {en: "Local self-governments", ru: "local_self_goverments", ua: "local_self_goverments"},};
