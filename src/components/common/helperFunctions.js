// mutates given list according to provided extensions
export const listExtender = (list, extensions) => {
  list.map(item => {
    for(let extension in extensions){
      item[extension] = extensions[extension].filter(inext => inext.id === item[extension])[0].name;
    }
  });
}