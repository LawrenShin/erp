import React from 'react';
import styled from 'styled-components';
import Loading from '../helpers/loading';
import uuid from 'uuid'

const div = ({className, children, ...rest}) => {
  return <div className={className} {...rest}>{children}</div>;
}

const Row = styled(div)`
  display: flex;
  flex-direction: row;
  ${({grow}) => grow && `flex-grow: 1;`}
  ${({width}) => width && `width: ${typeof width === "number" ? width + "px" : width};`}
  ${({height}) => height && `height: ${typeof height === "number" ? height + "px" : height};`}
  ${({padding}) => padding && `padding: ${typeof padding === "number" ? padding + "px" : padding};`}
  ${({background}) => background && `background: ${background};`} 
  ${({alignItems}) => alignItems && `align-items: ${alignItems};`}
  ${({justifyContent}) => justifyContent && `justify-content: ${justifyContent};`}
  ${({absolute}) => absolute && `position: absolute;`}
  ${({relative}) => relative && `position: relative;`}
  ${({left}) => left !== undefined && `left: ${typeof left === "number" ? left + "px" : left};`}
  ${({top}) => top !== undefined && `top: ${typeof top === "number" ? top + "px" : top};`}
  ${({right}) => right !== undefined && `right: ${typeof right === "number" ? right + "px" : right};`}
  ${({bottom}) => bottom !== undefined && `bottom: ${typeof bottom === "number" ? bottom + "px" : bottom};`}
`;

const Col = styled( div )`
  display: flex;
  flex-direction: column;
  ${({grow}) => grow && `flex-grow: 1;`}
  ${({width}) => width && `width: ${typeof width === "number" ? width + "px" : width};`}
  ${({height}) => height && `height: ${typeof height === "number" ? height + "px" : height};`}
  ${({padding}) => padding && `padding: ${typeof padding === "number" ? padding + "px" : padding};`} 
  ${({margin}) => margin && `margin: ${typeof margin === "number" ? margin + "px" : margin};`} 
  ${({offset}) => offset && `margin: ${offset + "px"} 0 0 0;`} 
  ${({alignItems}) => alignItems && `align-items: ${alignItems};`}
  ${({justifyContent}) => justifyContent && `justify-content: ${justifyContent};`}
  ${({background}) => background && `background: ${background};`} 
  ${({absolute}) => absolute && `position: absolute;`}
  ${({relative}) => relative && `position: relative;`}
  ${({left}) => left !== undefined && `left: ${typeof left === "number" ? left + "px" : left};`}
  ${({top}) => top !== undefined && `top: ${typeof top === "number" ? top + "px" : top};`}
  ${({right}) => right !== undefined && `right: ${typeof right === "number" ? right + "px" : right};`}
  ${({bottom}) => bottom !== undefined && `bottom: ${typeof bottom === "number" ? bottom + "px" : bottom};`}
`;

class Header extends React.PureComponent {
  render () {
    const {className, headerHeight, fields, background, headerBackground, padding, cellWidth, header, fixed} = this.props;

    return (
      <>
        <Row className={`data-table__header`}>
              {
                Object.keys(fields).map( (c, ci) =>
                  <Col className={`data-table__column data-table__column--${ci} data-table__column--${c}`} height={headerHeight} key={ci} alignItems="center" justifyContent="center" background={headerBackground} padding={padding} width={cellWidth}>{ header(fields[c], c, ci) }</Col>
                )              
              }
        </Row>   
        <Col className={`${className} _scrollTop`} absolute left={0} style={{zIndex: 2}} background={background}>
          <Row className="data-table__header" relative>
              {
                Object.keys(fields).map( (c, ci) =>
                  <Col className={`data-table__column data-table__column--${ci} data-table__column--${c}`} height={headerHeight} key={ci} alignItems="center" justifyContent="center" background={headerBackground} padding={padding} width={cellWidth}>{ header(fields[c], c, ci) }</Col>  
                )              
              }
              {fixed ?
                <Row className="data-table__header _scrollLeft" absolute top={0} style={{zIndex: 2}} background={background}>
                      {
                        Object.keys(fields).slice(0, fixed).map( (c, ci) =>
                          <Col className={`data-table__column data-table__column--${ci} data-table__column--${c}`} height={headerHeight} key={ci} alignItems="center" justifyContent="center" background={headerBackground} padding={padding} width={cellWidth}>{ header(fields[c], c, ci) }   </Col>  
                        )              
                      }
                </Row>
                :
                null
              }
          </Row> 
        </Col>   
      </>
    )
  }
}

class Rows extends React.PureComponent {
  render() {
    const {data, fields, cellHeight, cellBackground, offset, padding, cellWidth, cell, background, fixed, rowAfter, headerHeight, children} = this.props;
    if(typeof data !== 'string'){
      return (
        <>
          {
              data.map( (v, i) => 
                <>
                  <Row key={uuid()} className="data-table__row" relative>
                    {
                      Object.keys(fields).map( (c, ci, arr) => {
                        const cn = fixed > 0 && ci === fixed - 1  || ci == arr.length - 1 ? "hidden" : "";
                        // console.log(v) changing supplier data bug
                        return <Col className={`data-table__column data-table__column--${ci} data-table__column--${c} ${cn}`} height={cellHeight} key={ci} alignItems="center" justifyContent="center" background={cellBackground} offset={offset} padding={padding} width={cellWidth}>{ cell(v[c], c, i, ci) }</Col> // REST OF THE FIELDS
                      })
                    }
                    {fixed ?
                      <Row key={uuid()} absolute className="_scrollLeft" top={0} style={{zIndex: 1}}>
                        <Col background={background}>
                        {
                            <Row className="data-table__row">
                            {
                                Object.keys(fields).slice(0, fixed).map( (c, ci) => {
                                    const cn = fixed > 0 && ci === fixed - 1 ? "data-table__column--last" : "";
                                    return <Col className={`data-table__column data-table__column--${ci} data-table__column--${c} ${cn}`} height={cellHeight} key={ci} alignItems="center" justifyContent="center" background={cellBackground} offset={offset} padding={padding} width={cellWidth}>{cell(data[i][c], c, i, ci)}</Col> //IDS
                                })
                            }
                            </Row>
                        }
                        </Col>
                        {<Col className="shadow" offset={offset} height={(cellHeight + offset) * data.length - offset}
                        background="linear-gradient(to right, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0))">
                        </Col>}
                      </Row>
                    : null
                    }
                  </Row>
                  {rowAfter(i, v.id)}
                </>
              )
            }
            {children}
        </>
      );
    }else{
      return data;
    }
  }
}

class TableInner extends React.PureComponent {

  render() {
    const {className, headerHeight, fields, background, headerBackground, padding, cellWidth, header, fixed, data, cellHeight, cellBackground, offset, cell, rowAfter, children} = this.props;

    return (
      <Col className={className} absolute style={{overflow: "hidden"}} >
        <Header headerHeight={headerHeight} fields={fields} background={background} headerBackground={headerBackground} padding={padding} cellWidth={cellWidth} header={header} fixed={fixed} />          
        <Rows key={uuid()} data={data} fields={fields} headerHeight={headerHeight} cellHeight={cellHeight} cellBackground={cellBackground} offset={offset} padding={padding} cellWidth={cellWidth} cell={cell} background={background} fixed={fixed} rowAfter={rowAfter} children={children} />
      </Col>
    )
  }
}

const StyledTableInner = styled(({className, ...rest}) => {
  return <TableInner className={className} {...rest} />
})`

  ${({scrollTop, scrollLeft}) => `
    ._scrollTop {
      top: ${scrollTop}px;
    }
    ._scrollLeft {
      left: ${scrollLeft}px;
    }
  `
  }
`

class Table extends React.PureComponent {
  static defaultProps = {
    header: (title, name, col) => title,
    cell: (value, name, row, col) => value,
    onScroll: ({valueX, valueY, width, height}) => {},
    rowAfter: (row, width) => null,
    headerHeight: 50,
    cellHeight: 70,
    cellWidth: 200,
    className: '',
    padding: 10,
    background: "#f8f8fa",
    headerBackground: "transparent",
    cellBackground: "#ffffff",
    fixed: 0,
    offset: 8
  }

  state = {
    scrollLeft: 0,
    scrollTop: 0
  }

  ref = React.createRef();

  onScroll = ({valueX, valueY, width, height}) => {
    const shadow = this.ref.current.querySelector(".shadow");
    if(shadow) shadow.style.width = (valueX / width * 50) + "px";

    if(valueX > 0) {
        [].forEach.call(document.querySelectorAll(".data-table__column--last"), e => e.classList.add("hidden"));
    }
    else{
        [].forEach.call(document.querySelectorAll(".data-table__column--last"), e => e.classList.remove("hidden"));
    }

    this.setState({scrollLeft: valueX, scrollTop: valueY});

    this.props.onScroll({valueX, valueY, width, height});
  }
  
  componentDidMount(){
    this.ref.current.addEventListener("scroll", () => {
      this.onScroll({
        valueX: this.ref.current.scrollLeft, 
        valueY: this.ref.current.scrollTop, 
        width: this.ref.current.scrollWidth - this.ref.current.clientWidth, 
        height: this.ref.current.scrollHeight - this.ref.current.clientHeight
      });      
    }, false)
  }

  render() {
    const {fixed, data, cell, fields, height, headerHeight, cellHeight, cellWidth, offset, padding, className, background, headerBackground, cellBackground, children, rowAfter, header} = this.props;
    const {width, scrollTop, scrollLeft} = this.state;
    
    return (
      <div className={`data-table ${className}`} ref={this.ref} style={{position: "relative", width, height: height || (headerHeight + (cellHeight + offset) * data.length + 20), overflow: "auto"}}>
        <StyledTableInner scrollTop={scrollTop} scrollLeft={scrollLeft} headerHeight={headerHeight} fields={fields} headerBackground={headerBackground} padding={padding} cellWidth={cellWidth} header={header} fixed={fixed} data={data} cellHeight={cellHeight} cellBackground={cellBackground} offset={offset} cell={cell} background={background} rowAfter={rowAfter} children={children}/>       
      </div>
    )
  }
}

export default styled(Table)`
  .data-table__row .data-table__column:not(.hidden){
      position: relative;
      &::after{
          content: '';
          display: block;
          width: 1px;
          position: absolute;;
          right: 1px;
          top: 12px;
          bottom: 12px;
          background: #f0f0f2;
      }
  }

  .data-table__column{
    text-align: center;
  }

  .data-table__row:hover{
    .data-table__column {
      background: #DEF;
    }
  }
`