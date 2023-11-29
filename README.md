# React-gantt-antd-tokrak
A beautiful react gantt component with antd style.
This is a fork of [JSainsburyPLC/react-timelines](https://github.com/JSainsburyPLC/react-timelines)

![snapshot](https://github.com/icrdr/react-gantt-antd/raw/master/img/1.jpg)

## Install

```sh
yarn add react-gantt-antd-tokrak
```
## Example

```js
import React from 'react'
import Gantt from 'react-gantt-antd-tokrak'
import 'react-gantt-antd-tokrak/lib/css/style.css'

export default function App() {
  const tasks_a = [
    {
      id: "task0",
      index: 0,
      title: "任务名称1",
      start: new Date('2020-06-01'),
      end: new Date('2020-08-02'),
      tooltip: "任务全称1";
    }
  ]

  const tasks_b = [
    {
      id: "task1",
      index: 1,
      title: "任务名称2",
      start: new Date('2020-07-01'),
      end: new Date('2020-09-02'),
    }
  ]

  const sub_projects = [
    {
      id: "sub_project1",
      index: 1,
      title: "子项目",
      tasks: tasks_b,
    }
  ]

  const projects = [
    {
      id: "project1",
      index: 0,
      title: "项目1",
      tasks: tasks_a,
      projects: sub_projects,
      isOpen: false,
    }
  ]

  const clickTask = e => {
    console.log(e);
  };

  const clickProject = e => {
    console.log(e);
  };

  return (
    <Gantt
      start={new Date('2020-06-01')}
      end={new Date('2020-10-01')}
      now={new Date('2020-7-01')}
      zoom={1}
      sidebarWidth={240}
      minWidth={800}
      projects={projects}
      enableSticky={true}
      scrollToNow={true}
      clickTask={clickTask}
      clickProject={clickProject}
    />
  )
}

export default App
```
## API
### Gantt
| Property | value | default | Descriptions |
| :-----:| :----: | :----: | :---- |
| start | Date || The start date of the timeline |
| end | Date || The start date of the timeline |
| now | Date |new Date()| 'now' marker position |
| zoom | Number |1| The scale of the timeline width |
| projects | List |[]| The project list |
| minWidth | Number |800| The min width of the timeline when resizing the window |
| sidebarWidth | Number |240| The width of the sidebar |
| clickProject | function || when click project element |
| clickTask | function || when click task element |
| enableSticky | Bool |true| Determine whether the header is sticky or not |
| scrollToNow | Bool |true| Determine whether to scroll to the now marker at first or not |

### Project
| Property | value | default | Descriptions |
| :-----:| :----: | :----: | :---- |
| maintPrjId | String/Number || The id of the Project |
| index | Number || The index of the Project |
| maintPrjName | String/Element || The title of the Project |
| maintTasks | List || All the tasks of the Project |
| projects | List || All the sub projects of the Project |
| isOpen | Bool |false| Determine whether the project is folded  not |

### Task
| Property | value | default | Descriptions |
| :-----:| :----: | :----: | :---- |
| maintTaskId | String/Number || The id of the Task |
| index | Number || The index of the Task |
| taskName | String/Element || The title of the Task |
| beginTime | Date || The start date of the Task |
| endTime | Date || The start date of the Task |
| tooltip | String || The tooltip of the Task |

## Development

```sh
yarn install
yarn watch
yarn build
```


```
npm config set registry=http://registry.npmjs.org
npm config set registry=https://registry.npm.taobao.org/
```
