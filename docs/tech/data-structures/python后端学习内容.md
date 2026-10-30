## 结论

你现在学习Python后端，最合适的方式是：

> **FastAPI作为主框架，以`jd_extractor`为主项目，按“HTTP → API → SQL → ORM → 测试 → Docker”逐步扩展。**

不用先学完Python再学后端，也不需要同时学习Django、Flask、FastAPI。对于LLM应用开发岗位，当前优先选择：

```
Python
→ HTTP
→ FastAPI + Pydantic
→ PostgreSQL + SQLAlchemy
→ pytest + 日志
→ Docker
→ 异步、Redis等进阶内容
```

建议每周投入8—10小时，学习与项目开发比例大约为`3:7`。

---

# 一、阶段一：补齐后端需要的Python

时间：1—2周。

你不需要重新学习变量、循环等基础语法，重点补下面这些内容。

## 必学内容

- 模块与包；
- `import`和`python -m`；
- 函数、参数、返回值；
- 类型注解；
- 类和对象；
- `list`、`dict`、`set`；
- 异常处理；
- 文件和JSON读写；
- 虚拟环境和依赖管理；
- 基础调试；
- `with`上下文管理器；
- 生成器、装饰器只需初步理解。

## 推荐资源

### 主资源：CS50P选择性学习

[Harvard CS50P](https://cs50.harvard.edu/python/?utm_source=chatgpt.com)适合Python初学者，有课程、练习题和项目。

你不必完整学习，优先看：

- Week 3：Exceptions
- Week 4：Libraries
- Week 5：Unit Tests
- Week 6：File I/O
- Week 8：Object-Oriented Programming
- Week 9：Et Cetera

遇到语法问题，再查[Python官方教程](https://docs.python.org/3/tutorial/index.html?utm_source=chatgpt.com)，重点查看：

- 第4章：流程控制和函数；
- 第5章：数据结构；
- 第6章：模块；
- 第8章：异常；
- 第9章：类；
- 第10—11章：标准库；
- 第12章：虚拟环境和包。

官方教程更适合作为参考书，不建议从第一页开始通读。

## 项目练习

暂时不接FastAPI，先保证你能独立完成：

```
text = read_text_file(path)
cleaned = clean_text(text)
record = build_jd_record(cleaned)
validated = JDExtraction.model_validate(record)
save_json(validated.model_dump(), output_path)
```

验收标准：

- 能解释每个函数的输入和输出；
- 能增加一个新字段；
- 能根据报错定位到具体模块；
- 能区分普通字典和Pydantic对象；
- 不依赖AI整段重写代码。

---

# 二、阶段二：HTTP与FastAPI

时间：1—2周。

## 先学HTTP，再学FastAPI

需要理解：

- 客户端与服务器；
- 请求与响应；
- URL、路径、查询参数；
- JSON请求体；
- GET、POST、PUT、DELETE；
- 200、201、400、404、422、500；
- Header；
- HTTP无状态；
- REST API的基本含义。

资源：

- [MDN HTTP概述](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview?utm_source=chatgpt.com)
- [HTTP请求方法](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods?utm_source=chatgpt.com)
- [HTTP状态码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status?utm_source=chatgpt.com)
- [HTTP消息结构](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages?utm_source=chatgpt.com)

不需要现在学习HTTP/2、HTTP/3、TLS握手和底层网络实现。

## FastAPI学习顺序

使用[FastAPI官方教程](https://fastapi.tiangolo.com/tutorial/?utm_source=chatgpt.com)，按以下顺序学习：

1. First Steps
2. Path Parameters
3. Query Parameters
4. Request Body
5. Response Model
6. Handling Errors
7. Dependencies
8. Bigger Applications
9. Testing
10. Settings and Environment Variables

其中：

- 路由解决“什么请求交给什么函数”；
- Pydantic解决输入输出校验；
- Dependency解决数据库连接、鉴权等公共依赖；
- `APIRouter`解决多文件路由组织。

FastAPI官方教程里的代码都是可运行代码，适合边看边复制到一个临时练习项目，然后重新在`jd_extractor`中独立实现。[多文件项目教程](https://fastapi.tiangolo.com/tutorial/bigger-applications/?utm_source=chatgpt.com)

## 给`jd_extractor`增加接口

第一版只做三个接口：

```
POST /jobs/extract
GET  /jobs
GET  /jobs/{job_id}
```

例如：

```
@app.post("/jobs/extract", response_model=JDExtraction)
def extract_job(request: JDRequest) -> JDExtraction:
    cleaned = clean_text(request.text)
    record = build_jd_record(cleaned)
    return JDExtraction.model_validate(record)
```

这个阶段先使用普通`def`，不要急着把所有函数都写成`async def`。

---

# 三、阶段三：SQL与数据库

时间：2周。

## 先直接学习SQL

不要一上来只用ORM，否则你会不知道框架最终生成了什么查询。

需要掌握：

- 表、行、列、主键；
- `CREATE TABLE`；
- `INSERT`；
- `SELECT`；
- `WHERE`；
- `ORDER BY`；
- `UPDATE`；
- `DELETE`；
- `JOIN`；
- `GROUP BY`；
- 聚合函数；
- 外键；
- 事务；
- 索引的基本作用。

主资源使用[PostgreSQL官方入门教程](https://www.postgresql.org/docs/current/tutorial.html?utm_source=chatgpt.com)，重点学习：

- Getting Started；
- SQL Language；
- Joins；
- Aggregate Functions；
- Foreign Keys；
- Transactions。

PostgreSQL官方教程不要求Unix经验，适合作为数据库入门材料。

## 数据库学习顺序

建议：

```
SQLite练习SQL
→ PostgreSQL
→ SQLAlchemy
→ Alembic
```

SQLite配置简单，适合第一天跑通；但最终项目应迁移到PostgreSQL。

## 再学习SQLAlchemy

使用[SQLAlchemy 2.0 Unified Tutorial](https://docs.sqlalchemy.org/en/20/tutorial/index.html?utm_source=chatgpt.com)，重点看：

1. Engine和数据库连接；
2. Transaction；
3. Metadata和表；
4. Insert、Select、Update、Delete；
5. ORM模型；
6. Session；
7. Relationship。

不要学习旧版SQLAlchemy 1.x写法。当前官方稳定文档使用2.0风格，例如：

```
stmt = select(Job).where(Job.id == job_id)
```

而不是混用过时教程中的旧查询形式。

当数据库表结构需要修改时，再学习[Alembic官方教程](https://alembic.sqlalchemy.org/en/latest/tutorial.html?utm_source=chatgpt.com)。Alembic负责记录数据库结构变化，例如：

```
第一次：创建jobs表
第二次：增加evidence列
第三次：增加created_at列
```

## 项目数据表

第一版只需要一张`jobs`表：

```
jobs
├── id
├── company
├── position
├── education
├── internship_duration
├── raw_text
├── evidence
└── created_at
```

`skills`初期可以暂存JSON字段。等你真正需要复杂技能查询时，再拆成`skills`和关联表，不要提前过度设计。

---

# 四、阶段四：测试、日志与配置

时间：1周。

这部分在实习项目中的价值通常高于再学一个新框架。

## pytest

学习：

- `assert`；
- 测试函数；
- Fixture；
- 参数化测试；
- 测试异常；
- Mock外部模型API；
- FastAPI `TestClient`。

资源：

- [pytest入门](https://docs.pytest.org/en/stable/getting-started.html?utm_source=chatgpt.com)
- [pytest Fixtures](https://docs.pytest.org/en/stable/how-to/fixtures.html?utm_source=chatgpt.com)
- [FastAPI测试教程](https://fastapi.tiangolo.com/tutorial/testing/?utm_source=chatgpt.com)

优先测试：

```
clean_text
normalize_skills
build_jd_record
Pydantic校验失败
数据库保存与读取
POST /jobs/extract
GET /jobs/{id}
模型API超时
```

调用模型的测试不能每次真的消耗API费用，应使用Mock返回预设结果。

## 日志

至少记录：

- 请求进入；
- 模型调用开始和结束；
- 耗时；
- 解析失败；
- Pydantic校验错误；
- 数据库异常；
- 重试次数。

不要使用大量`print()`代替日志。

## 配置管理

密钥和数据库地址放在环境变量中：

```
MODEL_API_KEY=...
DATABASE_URL=...
```

代码中不要硬编码密钥，更不要提交到Git。

---

# 五、阶段五：Docker与运行环境

时间：3—5天。

学习：

- 镜像和容器；
- `Dockerfile`；
- 端口映射；
- 环境变量；
- Volume；
- `docker compose`；
- FastAPI和PostgreSQL两个服务如何连接。

直接使用[Docker官方Python指南](https://docs.docker.com/guides/python/?utm_source=chatgpt.com)，它包含如何容器化FastAPI，以及如何通过Compose连接数据库。

最终应当能够运行：

```
docker compose up
```

然后访问：

```
http://localhost:8000/docs
```

看到FastAPI生成的Swagger接口文档。

---

# 六、异步、Redis什么时候学

## 异步

不要在最开始系统学习事件循环。

当项目出现以下场景时再学习：

- 调用模型API需要等待；
- 同时请求多个外部服务；
- 上传和解析多个文件；
- 流式返回模型内容。

届时阅读[FastAPI异步与并发](https://fastapi.tiangolo.com/async/?utm_source=chatgpt.com)，理解：

- I/O密集与CPU密集；
- 协程；
- `await`；
- 阻塞调用；
- `def`和`async def`的选择。

目标是正确使用，不需要深入研究事件循环源码。

## Redis

等以下需求真实出现时再学习：

- 缓存相同JD的抽取结果；
- 保存短期任务状态；
- 限流；
- 后台任务队列；
- 避免重复调用模型。

当前阶段不用先学Redis、Kafka和Celery。

---

# 七、推荐的六周计划

|周次|学习内容|`jd_extractor`成果|
|---|---|---|
|第1周|Python异常、模块、类、类型注解|整理现有多文件结构|
|第2周|HTTP、FastAPI、Pydantic|完成抽取接口|
|第3周|SQL、SQLite/PostgreSQL|保存和查询JD|
|第4周|SQLAlchemy、Session、事务|完成数据库CRUD|
|第5周|pytest、Mock、日志、配置|增加测试和错误处理|
|第6周|Docker、Compose、部署|一条命令运行完整系统|

推荐目录可以逐渐演化为：

```
jd_extractor/
├── app/
│   ├── main.py
│   ├── api/
│   │   └── jobs.py
│   ├── schemas/
│   │   └── job.py
│   ├── models/
│   │   └── job.py
│   ├── services/
│   │   └── extractor.py
│   ├── db.py
│   └── config.py
├── tests/
├── data/
├── Dockerfile
├── compose.yaml
└── pyproject.toml
```

不需要第一天就建好所有目录。代码开始承担不同职责时再拆分。

---

# 八、暂时不要学什么

为了寒假前形成项目，暂时跳过：

- Django；
- Flask；
- 微服务架构；
- Kubernetes；
- Kafka；
- Nginx深度配置；
- Celery复杂任务系统；
- 高并发性能优化；
- 复杂设计模式；
- 完整OAuth2认证系统；
- 同时学习同步和异步两套SQLAlchemy；
- 多个Python包管理工具。

当前技术栈固定为：

```
FastAPI
Pydantic
PostgreSQL
SQLAlchemy 2.0
pytest
Docker
```

这已经足够完成一个有后端含量的LLM项目。

## 最重要的学习方法

每个知识点都采用同一个循环：

```
看20—40分钟资料
→ 写一个最小例子
→ 加入jd_extractor
→ 自己制造一次错误
→ 定位并修复
→ 写测试
→ 用自己的话解释
```

你现在最需要形成的能力不是记住FastAPI有多少装饰器，而是：

> 接到一个功能需求后，知道修改哪个模块；遇到错误时能够沿着请求、业务逻辑、模型和数据库逐层定位。

这才是Python后端能力，也是之后学习RAG和Agent工程化真正需要的底座。