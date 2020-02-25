/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const Application_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(8);
const common_1 = __webpack_require__(11);
async function bootstrap() {
    const app = await core_1.NestFactory.create(Application_1.Application, {
        cors: true
    });
    app.useStaticAssets('upload', {
        prefix: '/upload/'
    });
    app.setGlobalPrefix(`/${process.env.MANAGE_PREFIX}`);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('猿来阅')
        .setDescription('全网学习数据分享')
        .setVersion('0.1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.MANAGE_PORT || 8001, () => {
        console.log(`Server manage runing http://localhost:${process.env.MANAGE_PORT} port...`);
    });
}
bootstrap();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_module_1 = __webpack_require__(3);
const category_module_1 = __webpack_require__(19);
const db_module_1 = __webpack_require__(25);
const common_1 = __webpack_require__(11);
const manager_module_1 = __webpack_require__(31);
const config_1 = __webpack_require__(47);
const upload_module_1 = __webpack_require__(48);
const src_1 = __webpack_require__(32);
const site_module_1 = __webpack_require__(55);
let Application = class Application {
};
Application = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            db_module_1.DbModule,
            src_1.AuthModule,
            manager_module_1.UsersModule,
            category_module_1.CategoryModule,
            books_module_1.BooksModule,
            upload_module_1.UploadModule,
            site_module_1.SiteModule
        ]
    })
], Application);
exports.Application = Application;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_actions_entity_1 = __webpack_require__(4);
const book_entity_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(9);
const books_service_1 = __webpack_require__(10);
const common_1 = __webpack_require__(11);
const books_controller_1 = __webpack_require__(13);
let BooksModule = class BooksModule {
};
BooksModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([book_entity_1.Book, book_actions_entity_1.BookActions])],
        controllers: [books_controller_1.BooksController],
        providers: [books_service_1.BooksService]
    })
], BooksModule);
exports.BooksModule = BooksModule;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_entity_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(7);
let BookActions = class BookActions {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BookActions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BookActions.prototype, "down_count", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BookActions.prototype, "browse_count", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], BookActions.prototype, "fav_count", void 0);
__decorate([
    typeorm_1.OneToOne(type => book_entity_1.Book, book => book.bookActions),
    __metadata("design:type", book_entity_1.Book)
], BookActions.prototype, "book", void 0);
BookActions = __decorate([
    typeorm_1.Entity()
], BookActions);
exports.BookActions = BookActions;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_actions_entity_1 = __webpack_require__(4);
const category_entity_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(8);
let Book = class Book {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '中文名称',
        required: true,
        example: 'vue.js深入浅出'
    }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Book.prototype, "zh_name", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '英文名称', required: true, example: 'vue.js' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Book.prototype, "en_name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书',
        required: true,
        example: 'https://file.ituring.com.cn/SmallCover/19079fff942994b2fff5'
    }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Book.prototype, "book", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书封面',
        required: true,
        example: 'upload/images/covers/1580830233290.png'
    }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Book.prototype, "cover", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书概述',
        required: true
    }),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书特点',
        required: false
    }),
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Book.prototype, "feature", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '出版日期',
        required: true,
        example: '1579508386'
    }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Book.prototype, "create_time", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书总页数',
        required: true,
        example: '1200'
    }),
    typeorm_1.Column({ type: 'smallint' }),
    __metadata("design:type", Number)
], Book.prototype, "total_page", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '目录截图',
        required: true,
        example: [
            'upload/images/catalog/1580830233343.png',
            'upload/images/catalog/1580830233345.png'
        ]
    }),
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Book.prototype, "catalog", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '关于作者',
        required: true,
        example: '贾森·迈尔斯（Jason Myers），Built Technologies平台首席工程师，Juice Analytics公司高级开发者，曾在思科公司担任技术主管。在转做开发前，曾做过15年系统架构师。'
    }),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Book.prototype, "about_author", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '是否热门',
        required: true,
        example: 1
    }),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Book.prototype, "is_hot", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '是否推荐',
        required: true,
        example: 1
    }),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Book.prototype, "is_recommend", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '最新上架',
        required: true,
        example: 1
    }),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Book.prototype, "is_new", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '所属类别id',
        required: true,
        example: 3
    }),
    typeorm_1.ManyToOne(type => category_entity_1.Category, category => category.book),
    __metadata("design:type", category_entity_1.Category)
], Book.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToOne(type => book_actions_entity_1.BookActions, bookActions => bookActions.book, {
        cascade: true
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", book_actions_entity_1.BookActions)
], Book.prototype, "bookActions", void 0);
Book = __decorate([
    typeorm_1.Entity()
], Book);
exports.Book = Book;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(7);
const book_entity_1 = __webpack_require__(5);
let Category = class Category {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "zh_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "en_name", void 0);
__decorate([
    typeorm_1.OneToMany(type => book_entity_1.Book, book => book.category),
    __metadata("design:type", Array)
], Category.prototype, "book", void 0);
Category = __decorate([
    typeorm_1.Entity()
], Category);
exports.Category = Category;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_entity_1 = __webpack_require__(5);
const book_actions_entity_1 = __webpack_require__(4);
const common_1 = __webpack_require__(11);
const crud_typeorm_1 = __webpack_require__(12);
const typeorm_1 = __webpack_require__(9);
const typeorm_2 = __webpack_require__(7);
let BooksService = class BooksService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo, bookActionsRepository) {
        super(repo);
        this.bookActionsRepository = bookActionsRepository;
    }
    async deleteManyBooks(idArr) {
        const category = await this.repo.findByIds(idArr);
        return await this.repo
            .remove(category)
            .then(res => {
            return { code: 2000, message: '删除成功！', result: res };
        })
            .catch(err => {
            return { code: 2004, message: '删除失败，请稍后重试！' };
        });
    }
    async createOne(createBooksDto) {
        createBooksDto.bookActions = await this.bookActionsRepository.save({});
        return await this.repo.save(createBooksDto);
    }
};
BooksService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(book_entity_1.Book)),
    __param(1, typeorm_1.InjectRepository(book_actions_entity_1.BookActions)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository])
], BooksService);
exports.BooksService = BooksService;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@nestjsx/crud-typeorm");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __webpack_require__(14);
const replace_books_dto_1 = __webpack_require__(15);
const create_books_dto_1 = __webpack_require__(17);
const books_service_1 = __webpack_require__(10);
const book_entity_1 = __webpack_require__(5);
const common_1 = __webpack_require__(11);
const crud_1 = __webpack_require__(18);
const swagger_1 = __webpack_require__(8);
let BooksController = class BooksController {
    constructor(service) {
        this.service = service;
    }
    async deleteManyBooks(idArr) {
        return await this.service.deleteManyBooks(idArr);
    }
    async createOne(createBooksDto) {
        const book = await this.service.createOne(createBooksDto);
        return {
            code: 2000,
            message: '新增图书成功',
            result: book
        };
    }
};
__decorate([
    common_1.Delete(),
    swagger_1.ApiOperation({ summary: '批量删除图书' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteManyBooks", null);
__decorate([
    crud_1.Override(),
    __param(0, crud_1.ParsedBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_books_dto_1.CreateBooksDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "createOne", null);
BooksController = __decorate([
    crud_1.Crud({
        model: {
            type: book_entity_1.Book
        },
        dto: {
            create: create_books_dto_1.CreateBooksDto,
            replace: replace_books_dto_1.ReplaceBooksDto
        },
        routes: {
            exclude: ['updateOneBase', 'createManyBase']
        },
        query: {
            maxLimit: 100,
            join: {
                category: {
                    eager: true,
                    persist: ['zh_name'],
                    exclude: ['en_name']
                },
                actions: {
                    eager: true
                }
            }
        }
    }),
    common_1.Controller('books'),
    common_1.UseGuards(passport_1.AuthGuard('manage-jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('图书模块'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
exports.BooksController = BooksController;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_entity_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(8);
const class_validator_1 = __webpack_require__(16);
const typeorm_1 = __webpack_require__(7);
class ReplaceBooksDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: '中文名称',
        required: true,
        example: 'vue.js深入浅出'
    }),
    class_validator_1.IsNotEmpty({ message: '请输入中文书名' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "zh_name", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '英文名称', required: true, example: 'vue.js' }),
    class_validator_1.IsNotEmpty({ message: '请输入英文书名' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "en_name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书',
        required: true,
        example: '\\upload\\images\\covers\\1580830233290.png'
    }),
    class_validator_1.IsNotEmpty({ message: '请上传要替换的图书' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "book", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书封面',
        required: true,
        example: '\\upload\\images\\covers\\1580830233290.png'
    }),
    class_validator_1.IsNotEmpty({ message: '请添加此书封面图' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "cover", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书概述',
        required: true,
        example: '这是修改后的图书描述'
    }),
    class_validator_1.IsNotEmpty({ message: '请位本书添加描述' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书特点',
        required: false,
        example: '这是修改后的图书特点'
    }),
    class_validator_1.IsNotEmpty({ message: '请添加此书封面图' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "feature", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '出版日期',
        required: true,
        example: 1581350400000
    }),
    class_validator_1.IsNotEmpty({ message: '请添加出版日期' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "create_time", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书总页数',
        required: true,
        example: 1200
    }),
    class_validator_1.IsNotEmpty({ message: '请添加图书总页数' }),
    __metadata("design:type", Number)
], ReplaceBooksDto.prototype, "total_page", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '目录截图',
        required: true,
        example: '["upload/images/catalog/1580830233343.png","upload/images/catalog/1580830233345.png"]'
    }),
    class_validator_1.IsNotEmpty({ message: '请添加书籍目录照片' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "catalog", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '关于作者',
        required: true,
        example: '贾森·迈尔斯（Jason Myers），Built Technologies平台首席工程师，Juice Analytics公司高级开发者，曾在思科公司担任技术主管。在转做开发前，曾做过15年系统架构师。'
    }),
    class_validator_1.IsNotEmpty({ message: '为作者做些介绍' }),
    __metadata("design:type", String)
], ReplaceBooksDto.prototype, "about_author", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '所属类别id',
        required: true,
        example: 3
    }),
    typeorm_1.ManyToOne(type => category_entity_1.Category, category => category.book),
    __metadata("design:type", Array)
], ReplaceBooksDto.prototype, "category", void 0);
exports.ReplaceBooksDto = ReplaceBooksDto;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_entity_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(8);
const class_validator_1 = __webpack_require__(16);
const typeorm_1 = __webpack_require__(7);
class CreateBooksDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: '中文名称',
        required: true,
        example: 'vue.js深入浅出'
    }),
    class_validator_1.IsNotEmpty({ message: '请输入中文书名' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "zh_name", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '英文名称', required: true, example: 'vue.js' }),
    class_validator_1.IsNotEmpty({ message: '请输入英文书名' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "en_name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书',
        required: true,
        example: '\\upload\\images\\covers\\1580830233290.png'
    }),
    class_validator_1.IsNotEmpty({ message: '请上传图书' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "book", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书封面',
        required: true,
        example: '\\upload\\images\\covers\\1580830233290.png'
    }),
    class_validator_1.IsNotEmpty({ message: '请添加此书封面图' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "cover", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书概述',
        required: true,
        example: '这是图书概述'
    }),
    class_validator_1.IsNotEmpty({ message: '请位本书添加描述' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书特点',
        required: false,
        example: '这是图书特点'
    }),
    class_validator_1.IsNotEmpty({ message: '请添加此书特点' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "feature", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '出版日期',
        required: true,
        example: 1581350400000
    }),
    class_validator_1.IsNotEmpty({ message: '请添加出版日期' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "create_time", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '图书总页数',
        required: true,
        example: 1200
    }),
    class_validator_1.IsNotEmpty({ message: '请添加图书总页数' }),
    __metadata("design:type", Number)
], CreateBooksDto.prototype, "total_page", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '目录截图',
        required: true,
        example: "['upload\\images\\catalog\\1580830233343.png','upload\\images\\catalog\\1580830233345.png']"
    }),
    class_validator_1.IsNotEmpty({ message: '请添加书籍目录照片' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "catalog", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '关于作者',
        required: true,
        example: '贾森·迈尔斯（Jason Myers），Built Technologies平台首席工程师，Juice Analytics公司高级开发者，曾在思科公司担任技术主管。在转做开发前，曾做过15年系统架构师。'
    }),
    class_validator_1.IsNotEmpty({ message: '为作者做些介绍' }),
    __metadata("design:type", String)
], CreateBooksDto.prototype, "about_author", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '所属类别id',
        required: true,
        example: 4
    }),
    typeorm_1.ManyToOne(type => category_entity_1.Category, category => category.book),
    __metadata("design:type", Array)
], CreateBooksDto.prototype, "category", void 0);
exports.CreateBooksDto = CreateBooksDto;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@nestjsx/crud");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_entity_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(9);
const common_1 = __webpack_require__(11);
const category_controller_1 = __webpack_require__(20);
const category_service_1 = __webpack_require__(23);
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category])],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const roles_guard_1 = __webpack_require__(21);
const create_category_dto_1 = __webpack_require__(22);
const category_service_1 = __webpack_require__(23);
const common_1 = __webpack_require__(11);
const swagger_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(14);
const roles_decorator_1 = __webpack_require__(24);
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async findAllCategory(req) {
        const allCategory = await this.categoryService.findAllCategory();
        return {
            code: 2000,
            message: '查询图书分类成功。',
            result: allCategory
        };
    }
    async createCategory(createDto) {
        const category = await this.categoryService.createCategory(createDto);
        return {
            code: 2001,
            message: '创建图书分类成功！',
            result: category
        };
    }
    async updateCategory(id, updateCategoryDto) {
        const category = await this.categoryService.updateCategory(id, updateCategoryDto);
        return {
            code: 2002,
            message: '编辑图书分类成功！',
            result: category
        };
    }
    async deleteCategory(id) {
        return await this.categoryService.deleteCategory(id);
    }
    async deleteManyCategory(idArr) {
        return await this.categoryService.deleteManyCategory(idArr);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: '查询所有图书分类' }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllCategory", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: '增加图书分类' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation({ summary: '修改图书分类' }),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({ summary: '删除单个图书分类' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    common_1.Delete(),
    swagger_1.ApiOperation({ summary: '删除多个图书分类' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteManyCategory", null);
CategoryController = __decorate([
    common_1.Controller('category'),
    common_1.UseGuards(passport_1.AuthGuard('manage-jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('书籍类别'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(11);
const core_1 = __webpack_require__(1);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const hasRole = () => user.roles === 'admin';
        return user && hasRole();
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(core_1.Reflector)),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(8);
const class_validator_1 = __webpack_require__(16);
class CreateCategoryDto {
}
__decorate([
    swagger_1.ApiProperty({ description: '中文名称', required: true, example: '前端' }),
    class_validator_1.IsNotEmpty({ message: '请输入中文名称' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "zh_name", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '英文名称', required: true, example: 'web' }),
    class_validator_1.IsNotEmpty({ message: '请输入英文名称' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "en_name", void 0);
exports.CreateCategoryDto = CreateCategoryDto;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(9);
const common_1 = __webpack_require__(11);
const category_entity_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(7);
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async findAllCategory() {
        return await this.categoryRepository.find();
    }
    async createCategory(createDto) {
        const { zh_name, en_name } = createDto;
        return await this.categoryRepository.save({ zh_name, en_name });
    }
    async updateCategory(id, updateCategoryDto) {
        let category = await this.categoryRepository.findOne(id);
        category.zh_name = updateCategoryDto.zh_name;
        category.en_name = updateCategoryDto.en_name;
        return await this.categoryRepository.save(category);
    }
    async deleteCategory(id) {
        const category = await this.categoryRepository.findOne(id);
        return await this.categoryRepository
            .delete(category)
            .then(res => {
            return { code: 2003, message: '删除成功！', result: res };
        })
            .catch(err => {
            return { code: 2004, message: '删除失败，请稍后重试！' };
        });
    }
    async deleteManyCategory(idArr) {
        const category = await this.categoryRepository.findByIds(idArr);
        return await this.categoryRepository
            .remove(category)
            .then(res => {
            return { code: 2003, message: '删除成功！', result: res };
        })
            .catch(err => {
            return { code: 2004, message: '删除失败，请稍后重试！' };
        });
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(11);
exports.Roles = (...roles) => common_1.SetMetadata('roles', roles);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_actions_entity_1 = __webpack_require__(59);
const book_actions_entity_1 = __webpack_require__(4);
const user_entity_1 = __webpack_require__(26);
const manager_entity_1 = __webpack_require__(27);
const book_entity_1 = __webpack_require__(5);
const category_entity_1 = __webpack_require__(6);
const common_1 = __webpack_require__(11);
const db_service_1 = __webpack_require__(28);
const typeorm_1 = __webpack_require__(9);
const email_entity_1 = __webpack_require__(29);
const app_entity_1 = __webpack_require__(30);
let DbModule = class DbModule {
};
DbModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'mysql',
                    host: 'localhost',
                    port: Number(process.env.DB_PORT),
                    username: process.env.DB_NAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    entities: [
                        category_entity_1.Category,
                        book_entity_1.Book,
                        manager_entity_1.Manager,
                        user_entity_1.User,
                        email_entity_1.Email,
                        app_entity_1.App,
                        book_actions_entity_1.BookActions,
                        user_actions_entity_1.UserActions
                    ],
                    synchronize: true
                })
            })
        ],
        providers: [db_service_1.DbService],
        exports: [db_service_1.DbService]
    })
], DbModule);
exports.DbModule = DbModule;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(8);
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '邮箱',
        required: true,
        example: '123456@qq.com'
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '昵称',
        required: true,
        example: 'test'
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '密码', required: true, example: '123456' }),
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '头像',
        required: false,
        example: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=378824344,1185609431&fm=26&gp=0.jpg'
    }),
    typeorm_1.Column({
        default: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=378824344,1185609431&fm=26&gp=0.jpg'
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '注册时间',
        required: false,
        example: 1581692214957
    }),
    typeorm_1.Column({
        type: 'bigint',
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "register_time", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '最后一次登录时间',
        required: false,
        example: 1581692214957
    }),
    typeorm_1.Column({
        type: 'bigint',
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "login_time", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(8);
let Manager = class Manager {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Manager.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({
        description: '账号',
        required: true,
        example: 'admin'
    }),
    __metadata("design:type", String)
], Manager.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '密码',
        required: true,
        example: '123456'
    }),
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], Manager.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '权限',
        required: true,
        example: 'admin'
    }),
    typeorm_1.Column({ default: 'admin' }),
    __metadata("design:type", String)
], Manager.prototype, "roles", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '头像',
        required: false,
        example: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1640434779,3971610929&fm=26&gp=0.jpg'
    }),
    typeorm_1.Column({
        default: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1640434779,3971610929&fm=26&gp=0.jpg'
    }),
    __metadata("design:type", String)
], Manager.prototype, "avatar", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '创建时间',
        required: false
    }),
    typeorm_1.Column({ type: 'bigint', default: 0 }),
    __metadata("design:type", Number)
], Manager.prototype, "create_time", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '最后一次登录时间',
        required: false
    }),
    typeorm_1.Column({ type: 'bigint', default: 0 }),
    __metadata("design:type", Number)
], Manager.prototype, "login_time", void 0);
Manager = __decorate([
    typeorm_1.Entity()
], Manager);
exports.Manager = Manager;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(11);
let DbService = class DbService {
};
DbService = __decorate([
    common_1.Injectable()
], DbService);
exports.DbService = DbService;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(8);
let Email = class Email {
};
__decorate([
    swagger_1.ApiProperty({
        description: '邮件id',
        required: true,
        example: '9c0c9763-e55f-a70d-4ae0-2480fc66eec3@qq.com'
    }),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Email.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '邮箱',
        required: true,
        example: '421821209@qq.com'
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Email.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '验证码',
        required: true,
        example: 'cbha23'
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Email.prototype, "code", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '失效时间',
        required: true
    }),
    typeorm_1.Column({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Email.prototype, "fail_time", void 0);
Email = __decorate([
    typeorm_1.Entity()
], Email);
exports.Email = Email;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(7);
let App = class App {
};
__decorate([
    swagger_1.ApiProperty({
        description: 'appid',
        required: true,
        example: '__UNI__BF91653'
    }),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], App.prototype, "appid", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'app版本号',
        required: true,
        example: '1.0.2'
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], App.prototype, "version", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '更新内容',
        required: true,
        example: '常被误i悲催尾部i吧'
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], App.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '热更新下载地址',
        required: true,
        example: 'http://www.12345.com'
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], App.prototype, "hot_url", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '整包更新下载地址',
        required: true,
        example: 'http://www.12345.com'
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], App.prototype, "pack_url", void 0);
App = __decorate([
    typeorm_1.Entity()
], App);
exports.App = App;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __webpack_require__(32);
const manager_entity_1 = __webpack_require__(27);
const typeorm_1 = __webpack_require__(9);
const common_1 = __webpack_require__(11);
const manager_controller_1 = __webpack_require__(43);
const manager_service_1 = __webpack_require__(46);
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([manager_entity_1.Manager]), src_1.AuthModule],
        controllers: [manager_controller_1.UsersController],
        providers: [manager_service_1.UsersService],
        exports: [manager_service_1.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(33));
__export(__webpack_require__(37));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const myapp_jwt_strategy_1 = __webpack_require__(34);
const myapp_local_strategy_1 = __webpack_require__(36);
const user_entity_1 = __webpack_require__(26);
const roles_guard_1 = __webpack_require__(21);
const manage_jwt_strategy_1 = __webpack_require__(41);
const jwt_1 = __webpack_require__(38);
const manager_entity_1 = __webpack_require__(27);
const typeorm_1 = __webpack_require__(9);
const manage_local_strategy_1 = __webpack_require__(42);
const passport_1 = __webpack_require__(14);
const common_1 = __webpack_require__(11);
const auth_service_1 = __webpack_require__(37);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([manager_entity_1.Manager, user_entity_1.User]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.MANAGE_AUTH_SECRET,
                    signOptions: {
                        expiresIn: 3600
                    }
                })
            }),
            roles_guard_1.RolesGuard
        ],
        providers: [
            auth_service_1.AuthService,
            manage_local_strategy_1.ManageLocalStrategy,
            manage_jwt_strategy_1.ManageJwtStrategy,
            myapp_local_strategy_1.MyappLocalStrategy,
            myapp_jwt_strategy_1.MyappJwtStrategy
        ],
        exports: [auth_service_1.AuthService, roles_guard_1.RolesGuard]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __webpack_require__(35);
const passport_1 = __webpack_require__(14);
const common_1 = __webpack_require__(11);
let MyappJwtStrategy = class MyappJwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'myapp-jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.MANAGE_AUTH_SECRET
        });
    }
    async validate(payload) {
        const { id, email } = payload;
        return { id, email };
    }
};
MyappJwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MyappJwtStrategy);
exports.MyappJwtStrategy = MyappJwtStrategy;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __webpack_require__(37);
const passport_local_1 = __webpack_require__(40);
const passport_1 = __webpack_require__(14);
const common_1 = __webpack_require__(11);
let MyappLocalStrategy = class MyappLocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy, 'myapp-local') {
    constructor(authService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
        this.authService = authService;
    }
    async validate(username, password) {
        return await this.authService.validateUser(username, password);
    }
};
MyappLocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], MyappLocalStrategy);
exports.MyappLocalStrategy = MyappLocalStrategy;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = __webpack_require__(26);
const manager_entity_1 = __webpack_require__(27);
const jwt_1 = __webpack_require__(38);
const typeorm_1 = __webpack_require__(9);
const common_1 = __webpack_require__(11);
const bcryptjs_1 = __webpack_require__(39);
const typeorm_2 = __webpack_require__(7);
let AuthService = class AuthService {
    constructor(managerRepository, userRepository, jwtService) {
        this.managerRepository = managerRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateManager(username, password) {
        let manager = await typeorm_2.getConnection()
            .createQueryBuilder()
            .select('user')
            .from(manager_entity_1.Manager, 'user')
            .where('user.username =:username ', { username })
            .addSelect('user.password')
            .getOne();
        if (!manager) {
            throw new common_1.BadRequestException('用户不存在');
        }
        if (!bcryptjs_1.compareSync(password, manager.password)) {
            throw new common_1.BadRequestException('密码错误');
        }
        manager.login_time = Date.now();
        await this.managerRepository.save(manager);
        return manager;
    }
    async setToken(user) {
        const { username, id, roles } = user;
        const payload = { username, id, roles };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    async validateUser(username, password) {
        let user = await typeorm_2.getConnection()
            .createQueryBuilder()
            .select('user')
            .from(user_entity_1.User, 'user')
            .where('user.email =:email ', { email: username })
            .addSelect('user.password')
            .getOne();
        if (!user) {
            throw new common_1.BadRequestException('用户不存在');
        }
        if (!bcryptjs_1.compareSync(password, user.password)) {
            throw new common_1.BadRequestException('密码错误');
        }
        user.login_time = Date.now();
        await this.userRepository.save(user);
        return user;
    }
    async setUserToken(user) {
        const { email, id } = user;
        const payload = { email, id };
        return {
            token: this.jwtService.sign(payload)
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(manager_entity_1.Manager)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __webpack_require__(35);
const passport_1 = __webpack_require__(14);
const common_1 = __webpack_require__(11);
let ManageJwtStrategy = class ManageJwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'manage-jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.MANAGE_AUTH_SECRET
        });
    }
    async validate(payload) {
        const { id, username, roles } = payload;
        return { id, username, roles };
    }
};
ManageJwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ManageJwtStrategy);
exports.ManageJwtStrategy = ManageJwtStrategy;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __webpack_require__(37);
const passport_local_1 = __webpack_require__(40);
const passport_1 = __webpack_require__(14);
const common_1 = __webpack_require__(11);
let ManageLocalStrategy = class ManageLocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy, 'manage-local') {
    constructor(authService) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        });
        this.authService = authService;
    }
    async validate(username, password) {
        return await this.authService.validateManager(username, password);
    }
};
ManageLocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ManageLocalStrategy);
exports.ManageLocalStrategy = ManageLocalStrategy;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __webpack_require__(37);
const create_manager_dto_1 = __webpack_require__(44);
const login_manager_dto_1 = __webpack_require__(45);
const manager_service_1 = __webpack_require__(46);
const common_1 = __webpack_require__(11);
const swagger_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(14);
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async register(createDto) {
        const user = await this.usersService.register(createDto);
        return {
            code: 2010,
            message: '注册成功！',
            result: user
        };
    }
    async login(loginDto, req) {
        const _a = req.user, { password } = _a, result = __rest(_a, ["password"]);
        const token = await this.authService.setToken(result);
        return { result: token, code: 2011, message: '登陆成功' };
    }
    async logout(req) {
        return {
            code: 2012,
            message: '退出登录成功！'
        };
    }
    async getUser(req) {
        const user = await this.usersService.getUser(req.user);
        return { result: user, code: 2000, message: 'Token验证通过。' };
    }
};
__decorate([
    common_1.Post('/register'),
    swagger_1.ApiOperation({ summary: '注册' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manager_dto_1.CreateManagerDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    common_1.Put('/login'),
    common_1.UseGuards(passport_1.AuthGuard('manage-local')),
    swagger_1.ApiOperation({ summary: '登录' }),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_manager_dto_1.LoginManagerDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    common_1.Put('/logout'),
    common_1.UseGuards(passport_1.AuthGuard('manage-jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '退出登录' }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard('manage-jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '获取用户信息' }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
UsersController = __decorate([
    common_1.Controller('users'),
    swagger_1.ApiTags('管理员'),
    __metadata("design:paramtypes", [manager_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = __webpack_require__(16);
const manager_entity_1 = __webpack_require__(27);
class CreateManagerDto extends manager_entity_1.Manager {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: '请输入账号' }),
    class_validator_1.MinLength(3, { message: '账号长度至少为3' }),
    class_validator_1.MaxLength(10, { message: '账号长度至多为10' }),
    __metadata("design:type", String)
], CreateManagerDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '请输入密码' }),
    class_validator_1.MinLength(6, { message: '密码长度至少为6' }),
    class_validator_1.MaxLength(16, { message: '密码长度至多为16' }),
    __metadata("design:type", String)
], CreateManagerDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString({ message: '务必选择一个权限' }),
    __metadata("design:type", String)
], CreateManagerDto.prototype, "roles", void 0);
exports.CreateManagerDto = CreateManagerDto;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(8);
const class_validator_1 = __webpack_require__(16);
class LoginManagerDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: '账号',
        required: true,
        example: 'admin'
    }),
    class_validator_1.IsNotEmpty({ message: '请输入账号' }),
    class_validator_1.MinLength(3, { message: '账号长度至少为3' }),
    class_validator_1.MaxLength(10, { message: '账号长度至多为10' }),
    __metadata("design:type", String)
], LoginManagerDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '密码', required: true, example: '123456' }),
    class_validator_1.IsNotEmpty({ message: '请输入密码' }),
    class_validator_1.MinLength(6, { message: '密码长度至少为6' }),
    class_validator_1.MaxLength(16, { message: '密码长度至多为16' }),
    __metadata("design:type", String)
], LoginManagerDto.prototype, "password", void 0);
exports.LoginManagerDto = LoginManagerDto;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const manager_entity_1 = __webpack_require__(27);
const common_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(9);
const bcryptjs_1 = __webpack_require__(39);
let UsersService = class UsersService {
    constructor(managerRepository) {
        this.managerRepository = managerRepository;
    }
    async delete(deleteDto) {
        const { id } = deleteDto;
        const user = await this.managerRepository.delete(id);
        return { status: 1, message: '删除成功' };
    }
    async register(createDto) {
        createDto.create_time = Date.now();
        createDto.password = bcryptjs_1.hashSync(createDto.password);
        return await this.managerRepository.save(createDto);
    }
    async getUser(user) {
        return await this.managerRepository.findOne(user.id);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(manager_entity_1.Manager)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/config");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_config_1 = __webpack_require__(49);
const upload_controller_1 = __webpack_require__(53);
const common_1 = __webpack_require__(11);
const upload_service_1 = __webpack_require__(54);
let UploadModule = class UploadModule {
};
UploadModule = __decorate([
    common_1.Module({
        imports: [upload_config_1.uploadGlobalConfig],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService]
    })
], UploadModule);
exports.UploadModule = UploadModule;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const platform_express_1 = __webpack_require__(50);
const multer_1 = __webpack_require__(51);
const fs = __webpack_require__(52);
const common_1 = __webpack_require__(11);
exports.uploadGlobalConfig = platform_express_1.MulterModule.registerAsync({
    useFactory: () => ({
        preservePath: true,
        storage: multer_1.diskStorage({
            destination: (req, file, cb) => {
                switch (file.fieldname) {
                    case 'cover':
                        exports.checkDirAndCreate(exports.coverPath);
                        cb(null, exports.coverPath);
                        break;
                    case 'book':
                        exports.checkDirAndCreate(exports.bookPath);
                        cb(null, exports.bookPath);
                        break;
                    case 'catalog':
                        exports.checkDirAndCreate(exports.catalogPath);
                        cb(null, exports.catalogPath);
                        break;
                }
            },
            filename: (req, file, cb) => {
                const type = file.originalname.split('.');
                const filename = `${Date.now()}.${type[type.length - 1]}`;
                return cb(null, filename);
            }
        })
    })
});
exports.checkDirAndCreate = filePath => {
    const pathArr = filePath.split('/');
    let checkPath = '.';
    let item;
    for (item of pathArr) {
        checkPath += `/${item}`;
        if (!fs.existsSync(checkPath)) {
            fs.mkdirSync(checkPath);
        }
    }
};
exports.coverPath = 'upload/images/covers';
exports.coverVerification = {
    limits: { fileSize: 1024 * 500 },
    fileFilter(req, file, cb) {
        const mimetype = file.mimetype.split('/')[0].toLowerCase();
        const isErr = mimetype === 'image' ? true : false;
        isErr
            ? cb(null, isErr)
            : cb(new common_1.BadRequestException('文件格式错误！请确保你上传的为图片。'), false);
    }
};
exports.bookPath = 'upload/books';
exports.bookVerification = {
    limits: { fileSize: 1024 * 1024 * 300 },
    fileFilter(req, file, cb) {
        const mimetype = file.mimetype.split('/')[1].toLowerCase();
        const isErr = mimetype === 'pdf' ? true : false;
        isErr
            ? cb(null, isErr)
            : cb(new common_1.BadRequestException('文件格式错误！请确保你上传的为 PDF 格式。'), false);
    }
};
exports.catalogPath = 'upload/images/catalog';
exports.catalogVerification = {
    limits: { fileSize: 1024 * 500 },
    fileFilter(req, file, cb) {
        const mimetype = file.mimetype.split('/')[0].toLowerCase();
        const isErr = mimetype === 'image' ? true : false;
        isErr
            ? cb(null, isErr)
            : cb(new common_1.BadRequestException('文件格式错误！请确保你上传的为图片。'), false);
    }
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_config_1 = __webpack_require__(49);
const platform_express_1 = __webpack_require__(50);
const common_1 = __webpack_require__(11);
const swagger_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(14);
let UploadController = class UploadController {
    uploadImg(file) {
        const { path } = file;
        return { coverUrl: '/' + path };
    }
    uploadCatalog(files) {
        let catalogArr = [];
        for (const item of files) {
            const { path } = item;
            catalogArr.push('/' + path);
        }
        return catalogArr;
    }
    uploadBook(file) {
        const { path } = file;
        return { bookUrl: '/' + path };
    }
};
__decorate([
    common_1.Post('/cover'),
    swagger_1.ApiOperation({ summary: '封面图上传' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('cover', upload_config_1.coverVerification)),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UploadController.prototype, "uploadImg", null);
__decorate([
    common_1.Post('/catalog'),
    swagger_1.ApiOperation({ summary: '目录上传' }),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('catalog', 20, upload_config_1.catalogVerification)),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], UploadController.prototype, "uploadCatalog", null);
__decorate([
    common_1.Post('/book'),
    swagger_1.ApiOperation({ summary: '图书上传' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('book', upload_config_1.bookVerification)),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UploadController.prototype, "uploadBook", null);
UploadController = __decorate([
    common_1.Controller('upload'),
    swagger_1.ApiTags('上传模块'),
    common_1.UseGuards(passport_1.AuthGuard('manage-jwt')),
    swagger_1.ApiBearerAuth()
], UploadController);
exports.UploadController = UploadController;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(11);
let UploadService = class UploadService {
};
UploadService = __decorate([
    common_1.Injectable()
], UploadService);
exports.UploadService = UploadService;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_entity_1 = __webpack_require__(30);
const app_service_1 = __webpack_require__(56);
const manager_entity_1 = __webpack_require__(27);
const typeorm_1 = __webpack_require__(9);
const common_1 = __webpack_require__(11);
const site_controller_1 = __webpack_require__(57);
const site_service_1 = __webpack_require__(58);
let SiteModule = class SiteModule {
};
SiteModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([manager_entity_1.Manager, app_entity_1.App])],
        controllers: [site_controller_1.SiteController],
        providers: [site_service_1.SiteService, app_service_1.AppService]
    })
], SiteModule);
exports.SiteModule = SiteModule;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_entity_1 = __webpack_require__(30);
const typeorm_1 = __webpack_require__(9);
const common_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(7);
let AppService = class AppService {
    constructor(appRepository) {
        this.appRepository = appRepository;
    }
    async getAppInfo() {
        const appid = '__UNI__BF91653';
        return this.appRepository.findOne(appid);
    }
    async setAppInfo(app) {
        const { appid, hot_url, pack_url, content, version } = app;
        let appinfo = await this.appRepository.findOne(appid);
        appinfo.hot_url = hot_url;
        appinfo.pack_url = pack_url;
        appinfo.content = content;
        appinfo.version = version;
        return await this.appRepository.save(appinfo);
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(app_entity_1.App)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppService);
exports.AppService = AppService;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_entity_1 = __webpack_require__(30);
const app_service_1 = __webpack_require__(56);
const roles_guard_1 = __webpack_require__(21);
const passport_1 = __webpack_require__(14);
const site_service_1 = __webpack_require__(58);
const common_1 = __webpack_require__(11);
const swagger_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(24);
let SiteController = class SiteController {
    constructor(siteService, appService) {
        this.siteService = siteService;
        this.appService = appService;
    }
    async getAllManage() {
        const allManagers = await this.siteService.getAllManage();
        return {
            code: 2000,
            message: '管理员查询成功！',
            result: allManagers
        };
    }
    async getAppInfo() {
        const appInfo = await this.appService.getAppInfo();
        return {
            code: 2000,
            message: 'app版本信息获取成功',
            result: appInfo
        };
    }
    async setAppInfo(app) {
        const appInfo = await this.appService.setAppInfo(app);
        return {
            code: 2000,
            message: 'app版本信息修改成功',
            result: appInfo
        };
    }
};
__decorate([
    common_1.Get('/manager'),
    swagger_1.ApiOperation({ summary: '管理员列表' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "getAllManage", null);
__decorate([
    common_1.Get('/app'),
    swagger_1.ApiOperation({ summary: '获取app版本信息' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "getAppInfo", null);
__decorate([
    common_1.Put('/app'),
    swagger_1.ApiOperation({ summary: '修改app版本信息' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_entity_1.App]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "setAppInfo", null);
SiteController = __decorate([
    common_1.Controller('site'),
    swagger_1.ApiTags('系统设置'),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles('admin'),
    common_1.UseGuards(passport_1.AuthGuard('manage-jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [site_service_1.SiteService,
        app_service_1.AppService])
], SiteController);
exports.SiteController = SiteController;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const manager_entity_1 = __webpack_require__(27);
const typeorm_1 = __webpack_require__(9);
const common_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(7);
let SiteService = class SiteService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllManage() {
        return await this.userRepository.find();
    }
};
SiteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(manager_entity_1.Manager)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SiteService);
exports.SiteService = SiteService;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(7);
let UserActions = class UserActions {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserActions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '[]' }),
    __metadata("design:type", String)
], UserActions.prototype, "fav_list", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.User),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], UserActions.prototype, "user", void 0);
UserActions = __decorate([
    typeorm_1.Entity()
], UserActions);
exports.UserActions = UserActions;


/***/ })
/******/ ]);