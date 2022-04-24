Установить `cookiecutter`

```
pip3 install cookiecutter
```

или

```
apt install cookiecutter
```

подробнее [здесь](https://cookiecutter.readthedocs.io/en/1.7.2/installation.html)

Инициализировать проект, указав его название

```
cookiecutter git+ssh://git@git.apptimizm.pro/templates/nuxt-site-template.git
```

Далее ребуется указать текущее название репозитория и группы с подгруппами если такие имеются

```
test@machine:~/app$ cookiecutter git+ssh://git@git.apptimizm.pro/templates/nuxt-site-template.git              # Первая комманда всегда вот такая
project_name [nuxt_template]: example_front                                                                    # Название проекта точно согласно названию репозитория        
project_group [project_group]: group_example/subgroup_example                                                  # Тут указываем либо просто группу либо группу с подгруппами как в этом случае
```

Далее привязать проект к нужному репозиторию

```
cd example_front
git init
git remote add origin REPOSITORY_URL
git add .
git commit -m "Initial commit"
git push -u origin master
```

Если вы хотит что-то добавить/исправить в шаблоне - оформите мержреквест

Если вы хотите внести изменения в процесс разработки, 
обсудите их в группе бэкенда в телеграмме и сделайте их в вики проекта
