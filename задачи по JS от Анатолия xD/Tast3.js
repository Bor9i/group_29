let enterprises = [
    {
      id: 1,
      name: "Предприятие 1",
      departments: [
        {
          id: 2,
          name: "Отдел тестирования",
          employees_count: 10,
        },
        {
          id: 3,
          name: "Отдел маркетинга",
          employees_count: 20,
        },
        {
          id: 4,
          name: "Администрация",
          employees_count: 15,
        },
      ]
    },
    {
      id: 5,
      name: "Предприятие 2",
      departments: [
        {
          id: 6,
          name: "Отдел разработки",
          employees_count: 50,
        },
        {
          id: 7,
          name: "Отдел маркетинга",
          employees_count: 20,
        },
        {
          id: 8,
          name: "Отдел охраны труда",
          employees_count: 5,
        },
      ]
    },
    {
      id: 9,
      name: "Предприятие 3",
      departments: [
        {
          id: 10,
          name: "Отдел аналитики",
          employees_count: 0,
        },
      ]
    }
  ]

// 1
const print = (arr) => arr.forEach((element) => {
    const ppl = (element.departments.reduce((acc, item) => acc + item.employees_count, 0));
    console.log(`${element.name} (сотрудников ${ppl > 0 ? ppl : "нет"})`);
    element.departments.forEach((item) => {
        console.log(` - ${item.name} (сотрудников ${item.employees_count > 0 ? item.employees_count : "нет"})`);
    })
  });
//print(enterprises);

// 2
const getEnterpriseName = (departmentName, arr = enterprises) => {
    if (isNaN(departmentName)) {
        for (let enterprise of arr) {
            for (let department of enterprise.departments) {
                if (department.name === departmentName) {
                    return enterprise.name;
                }
            }
        }
    } else {
        for (let enterprise of arr) {
            for (let department of enterprise.departments) {
                if (department.id === departmentName) {
                    return enterprise.name;
                }
            }
          }
    }
    return "нет отдела с таким номером";
    
}
//console.log(getEnterpriseName(1));

// 3
const addEnterprise = (enterpriseName, arr = enterprises) => {
    const newId = arr[arr.length - 1].departments[arr[arr.length - 1].departments.length - 1].id + 1;
    arr.push({id: newId, name: enterpriseName, departments: []});
}
//addEnterprise('Новое предприятие');
//print(enterprises);

// 4
const addDepartment = (enterpriseId, departmentName, arr = enterprises) => {
    const idList = arr.map((enterprise) => enterprise.id);
    const newId = arr[arr.length - 1].departments[arr[arr.length - 1].departments.length - 1].id + 1;
    if (idList.includes(enterpriseId)) {
        for (let enterprise of arr) {
            if (enterprise.id === enterpriseId) {
                enterprise.departments.push({id: newId, name: departmentName, employees_count: 0});
            }
          }
    } else {
        console.log("нет предприятия с таким номером");
    }
    
};
//addDepartment(9, "Новый отдел");
//print(enterprises);

// 5
const editEnterprise = (enterpriseId, newName, arr = enterprises) => {
    const idList = arr.map((enterprise) => enterprise.id);
    if (idList.includes(enterpriseId)) {
        for (let enterprise of arr) {
            if (enterprise.id === enterpriseId) {
                enterprise.name = newName;
            }
        }
    } else {
        console.log("нет предприятия с таким номером");
    }
};
//editEnterprise(100,"Проверка смены названия");
//print(enterprises);

// 6
const editDepartment = (departmentId, newName, arr = enterprises) => {
    let concatIdList = [];
    for (let enterprise of arr) {
        const idList = enterprise.departments.map((department) => department.id);
        concatIdList = concatIdList.concat(idList);
        if (idList.includes(departmentId)) {
            for (let department of enterprise.departments) {
                if (department.id === departmentId) {
                    department.name = newName
                }
            }
        }
      }
    if (!concatIdList.includes(departmentId)) {
        console.log("нет отдела с таким номером");
    }
}
//editDepartment(2,"Проверка смены названия");
//print(enterprises);

// 7
const deleteEnterprise = (enterpriseId, arr = enterprises) => {
    const idList = arr.map((enterprise) => enterprise.id);
    if (idList.includes(enterpriseId)) {
        const newEnterprises = arr.filter((enterprise) => enterprise.id !== enterpriseId);
        enterprises = newEnterprises;
    } else {
        console.log("нет предприятия с таким номером");
    }
    
}
//deleteEnterprise(1);
//print(enterprises);

//8
const deleteDepartment = (departmentId, arr = enterprises) => {
    let concatIdList = [];
    for (let enterprise of arr) {
        const idList = enterprise.departments.map((department) => department.id);
        concatIdList = concatIdList.concat(idList);
        if (concatIdList.includes(departmentId)) {
            for (let department of enterprise.departments) {
                if (department.id === departmentId && department.employees_count < 1) {
                    const newDepartmentsList = enterprise.departments.filter((depatment) => depatment.id !== departmentId);
                    enterprise.departments = newDepartmentsList;
                } else {
                    console.log("невозможно выполнить");
                    return;
                }
            }
        }
      }
    if (!concatIdList.includes(departmentId)) {
        console.log("нет отдела с таким номером");
    }
}
//deleteDepartment(2);
//print(enterprises);

// 9
const moveEmployees = (fromId, whereId, arr = enterprises) => {
    let buffer = 0;
    let concatIdList = [];
    for (let enterprise of arr) {
        const idList = enterprise.departments.map((department) => department.id);
        concatIdList = concatIdList.concat(idList);
        if (!concatIdList.includes(fromId) || !concatIdList.includes(whereId)) {
            console.log("нет отдела с таким номером");
            return;
          }
        if (idList.includes(fromId)) {
            for (let department of enterprise.departments) {
                if (department.id === fromId) {
                    buffer = department.employees_count;
                    department.employees_count = 0
                }
            }
        }
      }
      for (let enterprise of arr) {
        const idList = enterprise.departments.map((department) => department.id);
        if (idList.includes(whereId)) {
            for (let department of enterprise.departments) {
                if (department.id === whereId) {
                    department.employees_count = department.employees_count + buffer;
                }
            }
        }
      }
}
moveEmployees(2, 300);
print(enterprises);