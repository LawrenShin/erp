// mutates given list according to provided extensions
export const listExtender = (list, extensions) => {
  if(list){
    list.map(item => {
      for(let extension in extensions){
        if(extension in item){
          let coincidence = extensions[extension].filter(inext => {
            if('value' in inext) return inext.value === item[extension]
            if('id' in inext) return inext.id === item[extension]
          })
          if( coincidence.length ) {
            if('name' in coincidence[0]) item[extension] = coincidence[0].name
            if('text' in coincidence[0]) item[extension] = coincidence[0].text
          }
        }
      }
      return item
    });
  }
}