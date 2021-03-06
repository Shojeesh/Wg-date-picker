import React, {useState} from 'react';
import logo from './logo.svg';
import './app.css';
import styled, {css} from 'styled-components';
import IconLeftArrow from './icons/IconLeftArrow';
import IconRightArrow from './icons/IconRightArrow';

const SearchWidget = styled.div`
    width: 100%;
    height: 200px;
    background: #fff;
    border-radius: 0 .5rem .5rem .5rem;
    box-shadow: 0 4px 16px 0 rgba(39,36,44,.16);
    display: flex;
    align-items: center;
    justify-content: center;
`
const DatePickerWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    user-select none;
`
const DatePicker = styled.div`
    display: block;
    position: absolute;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    z-index: 99;
    top: -20px;
    right: -20px;
    padding: 16px;
    transition: opacity .2s,transform .2s;
    transition-timing-function: ease;
    visibility: visible;
    transform: scale(1,1);
    transform-origin: top left;
    opacity: 1;
    transform-origin: top right;
    &.isActive{
        box-shadow: 0 2px 8px 0 rgba(39,38,44,.2);
    }
`
const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 1;
`
const MobileHeader = styled.div`
`
const WebHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`
const Clear = styled.button`
    border-width: 0;
    border-radius: 4px;
    width: 70px;
    height: 30px;
    font-family: inherit;
    font-size: 15px;
    color: #44b50c;
    cursor: pointer;
    outline: 0;
    background: 0 0;
    &:hover{
        background: #e7fddc;
    }
`
const DateHolder = styled.div`
    display: flex;
    position: relative;
`
const DateField = styled.div`
    flex: 1;
    position: relative;
    height: 64px;
    background-color: #fff;
    border: solid 1px #e5e3e8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 15px;
    font-size: 1.6rem;
    color: #666;
    cursor: pointer;
    &+&{
        margin-left: -2px;
    }
    ${props=>props.depart && css`
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    `}
    ${props=>props.return && css`
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    `}
    ${props=>props.active && css`
        border: solid 2px #55c901;
    `}
    label{
        font-size 1.4rem;
        margin-left: 3px;
        margin-bottom: 5px;
        pointer-events: none;
        &.isActive{
            display: block;
        }
    }
    input{
        border: 0;
        pointer-events: none;
        &:focus{
            outline: 0;
        }
    }
`
const DateFieldArrows = styled.div`
    position: absolute;
    top: 20px;
    right: 5px;
    display: flex;
    justify-content: space-between;
    ${props => props.isDisabled && css`
        display: none;
    `}
`
const DateFieldArrow = styled.div`
    width: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        width: 6px;
        path{
            fill: #999;
        }
    }
`
const MonthHeader = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg{
        width: 5px;
    }
`
const MonthYear = styled.div`
    flex: 1;
    text-align: center;
    font-weight: 600;
`
const MonthHolder = styled.span`
`
const YearHolder = styled.span`
`
const ArrowBlock = styled.div` 
`
const Arrows = styled.div`
    height: 40px;
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
`
const Arrow = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    &:hover{
        background: #e7fddc;
    }
`
const Body = styled.div`
    display: flex;
    justify-content: space-between;
`
const Calendar = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    &.isWeb{
        .dpMonth + .dpMonth{
            margin-left: 20px;
        }
    }
    &.isMobile{
        flex-direction: column;
        .dpMonth + .dpMonth{
            margin-top: 15px;
        }
    }
`
const Month = styled.div`
    width: 100%;
    max-width: 296px;
    position: relative;
`
const Weeks = styled.div`
`
const Week = styled.div`
    display: flex;
    align-items: center;
`
const DayLabel = styled.div`
    color: #828086;
    font-size: 14px;
    font-weight: 400;
    height: 16px;
    margin: 0 12px 0 0;
    padding: 8px 0;
    text-align: center;
    width: 32px;
    height: 32px;
    &:nth-of-type(7) {
        color: rgba(0,0,0,.85);
        margin: 0;
    }
`
const Day = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    cursor: pointer;
    margin-bottom: 12px;
    margin-right: 12px;
    border-radius: 4px;
    &:nth-of-type(7n){
        margin-right: 0;
    }
    &:hover{
        background: #e7fddc;
    }
    ${props=>props.empty && css`
        pointer-events: none;
    `}
    ${props=>props.holiday && css`
        color: #ea5050!important;
        font-weight: 500;
    `}
    ${props=>props.selected && css`
        background-color: #44b50c;
        color: #fff;
        font-weight: 500;
        border-radius: 4px;
        &:hover{
            background-color: #44b50c;
            color: #fff;
        }
    `}
    ${props=>props.selectedFrom && css`
        &:after{
            content: '';
            width: 24px;
            height: 32px;
            background: #bef7a1;
            right: -12px;
            position: absolute;
            top: 0;
            z-index: -1;
        }
    `}
    ${props=>props.range && css`
        color: #44b50c;
        font-weight: 600;
        background-color: #bef7a1;
        border-radius: 0;
        &:nth-of-type(7n){
            margin-right: 0;
            border-right: 0;
            &:after{
                display: none;
            }
        }
        &:after{
            content: '';
            width: 24px;
            height: 32px;
            background: #bef7a1;
            right: -15px;
            position: absolute;
            top: 0;
            z-index: -1;
        }
    `}
`
const Footer = styled.div`
`
const HolidayHeader = styled.div`
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    color: #828086;
    padding: 4px 0 3px;
    text-transform: uppercase;
`
const Holidays = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
`
const Holiday = styled.div`
    height: 20px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 400;
    margin: 5px 5px 0 0;
    background-color: #f8f8f8;
`
const HolidayDate = styled.div`
    color: #cc061b;
`
const HolidayName = styled.div`
    color: #999;
    margin-left: 5px;
`
const Tooltip = styled.div`
    background-color: #333;
    color: #fff;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 700;
    border-radius: 4px;
    padding: 3px 8px;
    position: absolute;
    z-index: 1;
    top: 150%;
    left: 50%;
    pointer-events: none;
    transform: translateX(-50%);
    visibility: hidden;
    &:before{
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #333 transparent;
    }
    ${Day}:hover & {
        visibility: visible;
    }
`

function App() {
    const isMobile = false
    const hasReturn = true
    const hasValue = true
    const [showPicker, setShowPicker] = useState(false);
    const togglePicker = () => {
        setShowPicker(prevState => !prevState);
    }
    return (
        <div className="App">
            <SearchWidget>
                <DatePickerWrap>
                    <DatePicker className={showPicker ? 'isActive' : ''}>
                        {isMobile ? 
                            <MobileHeader>
                            </MobileHeader>:
                            <WebHeader>
                                { showPicker &&
                                    <Clear>
                                        Clear
                                    </Clear>
                                }
                                <DateHolder>
                                    <DateField depart active onClick={togglePicker}>
                                        <label>Depart</label>
                                        <input readonly="readonly" type="text" placeholder="10/04/21" />
                                    </DateField>
                                    { hasReturn && 
                                        <DateField return active onClick={togglePicker}>
                                            <label>Return</label>
                                            <input readonly="readonly" type="text" placeholder="11/04/21" />
                                        </DateField>
                                    }
                                    <DateFieldArrows isDisabled={ hasValue === false}
                                    >
                                        <DateFieldArrow onClick={() => console.log("previous date")}>
                                            <IconLeftArrow />
                                        </DateFieldArrow>
                                        <DateFieldArrow onClick={() => console.log("next date")}>
                                            <IconRightArrow />
                                        </DateFieldArrow>
                                    </DateFieldArrows>
                                </DateHolder>
                            </WebHeader>
                        }
                        { showPicker &&
                            <Body>
                                <Calendar className={isMobile ? 'isMobile' : 'isWeb'}>
                                    <Month className='dpMonth'>
                                        <MonthHeader>
                                            <Arrows>
                                                <Arrow>
                                                    <IconLeftArrow />
                                                    <IconLeftArrow />
                                                </Arrow>
                                                <Arrow>
                                                    <IconLeftArrow />
                                                </Arrow>
                                            </Arrows>
                                            <MonthYear>
                                                <MonthHolder>January</MonthHolder> <YearHolder>2020</YearHolder>
                                            </MonthYear>
                                            <Arrows>
                                                <Arrow>
                                                    <IconRightArrow />
                                                </Arrow>
                                                <Arrow>
                                                    <IconRightArrow />
                                                    <IconRightArrow />
                                                </Arrow>
                                            </Arrows>
                                        </MonthHeader>
                                        <Weeks>
                                            <Week>
                                                <DayLabel key="0">Mon</DayLabel>
                                                <DayLabel key="1">Tue</DayLabel>
                                                <DayLabel key="2">Wed</DayLabel>
                                                <DayLabel key="3">Thu</DayLabel>
                                                <DayLabel key="4">Fri</DayLabel>
                                                <DayLabel key="5">Sat</DayLabel>
                                                <DayLabel key="6">Sun</DayLabel>
                                            </Week>
                                            <Week>
                                                <Day empty></Day>
                                                <Day empty></Day>
                                                <Day empty></Day>
                                                <Day empty></Day>
                                                <Day holiday>
                                                    1*
                                                    <Tooltip>
                                                        New Year
                                                    </Tooltip>
                                                </Day>
                                                <Day>2</Day>
                                                <Day>3</Day>
                                            </Week>
                                            <Week>
                                                <Day selected selectedFrom>4</Day>
                                                <Day range>5</Day>
                                                <Day range>6</Day>
                                                <Day range>7</Day>
                                                <Day range>8</Day>
                                                <Day range>9</Day>
                                                <Day range>10</Day>
                                            </Week>
                                            <Week>
                                                <Day range>11</Day>
                                                <Day range>12</Day>
                                                <Day range>13</Day>
                                                <Day range>14</Day>
                                                <Day range>15</Day>
                                                <Day selected selectedTo>16</Day>
                                                <Day>17</Day>
                                            </Week>
                                            <Week>
                                                <Day>18</Day>
                                                <Day>19</Day>
                                                <Day>20</Day>
                                                <Day>21</Day>
                                                <Day>22</Day>
                                                <Day>23</Day>
                                                <Day>24</Day>
                                            </Week>
                                            <Week>
                                                <Day holiday>
                                                    25*
                                                    <Tooltip>
                                                        Christmas
                                                    </Tooltip>
                                                </Day>
                                                <Day>26</Day>
                                                <Day>27</Day>
                                                <Day>28</Day>
                                                <Day>29</Day>
                                                <Day>30</Day>
                                                <Day>31</Day>
                                            </Week>
                                        </Weeks>
                                        <Footer>
                                            <HolidayHeader>
                                                *Public Holidays
                                            </HolidayHeader>
                                            <Holidays>
                                                <Holiday>
                                                    <HolidayDate>
                                                        25 Dec
                                                    </HolidayDate>
                                                    <HolidayName>
                                                        Christmas
                                                    </HolidayName>
                                                </Holiday>

                                                <Holiday>
                                                    <HolidayDate>
                                                        1 Jan
                                                    </HolidayDate>
                                                    <HolidayName>
                                                        New Year
                                                    </HolidayName>
                                                </Holiday>
                                            </Holidays>
                                        </Footer>
                                    </Month>
                                    { hasReturn && 
                                        <Month className='dpMonth'>
                                            <MonthHeader>
                                                <Arrow>
                                                    <IconLeftArrow />
                                                    <IconLeftArrow />
                                                </Arrow>
                                                <Arrow>
                                                    <IconLeftArrow />
                                                </Arrow>
                                                <MonthYear>
                                                    <MonthHolder>January</MonthHolder> <YearHolder>2020</YearHolder>
                                                </MonthYear>
                                                <Arrow>
                                                    <IconRightArrow />
                                                </Arrow>
                                                <Arrow>
                                                    <IconRightArrow />
                                                    <IconRightArrow />
                                                </Arrow>
                                            </MonthHeader>
                                            <Weeks>
                                                <Week>
                                                    <DayLabel key="0">Mon</DayLabel>
                                                    <DayLabel key="1">Tue</DayLabel>
                                                    <DayLabel key="2">Wed</DayLabel>
                                                    <DayLabel key="3">Thu</DayLabel>
                                                    <DayLabel key="4">Fri</DayLabel>
                                                    <DayLabel key="5">Sat</DayLabel>
                                                    <DayLabel key="6">Sun</DayLabel>
                                                </Week>
                                                <Week>
                                                    <Day empty></Day>
                                                    <Day empty></Day>
                                                    <Day empty></Day>
                                                    <Day empty></Day>
                                                    <Day holiday>
                                                        1*
                                                        <Tooltip>
                                                            New Year
                                                        </Tooltip>
                                                    </Day>
                                                    <Day>2</Day>
                                                    <Day>3</Day>
                                                </Week>
                                                <Week>
                                                    <Day selected selectedFrom>4</Day>
                                                    <Day range>5</Day>
                                                    <Day range>6</Day>
                                                    <Day range>7</Day>
                                                    <Day range>8</Day>
                                                    <Day range>9</Day>
                                                    <Day range>10</Day>
                                                </Week>
                                                <Week>
                                                    <Day range>11</Day>
                                                    <Day range>12</Day>
                                                    <Day range>13</Day>
                                                    <Day range>14</Day>
                                                    <Day range>15</Day>
                                                    <Day selected selectedTo>16</Day>
                                                    <Day>17</Day>
                                                </Week>
                                                <Week>
                                                    <Day>18</Day>
                                                    <Day>19</Day>
                                                    <Day>20</Day>
                                                    <Day>21</Day>
                                                    <Day>22</Day>
                                                    <Day>23</Day>
                                                    <Day>24</Day>
                                                </Week>
                                                <Week>
                                                    <Day holiday>
                                                        25*
                                                        <Tooltip>
                                                            Christmas
                                                        </Tooltip>
                                                    </Day>
                                                    <Day>26</Day>
                                                    <Day>27</Day>
                                                    <Day>28</Day>
                                                    <Day>29</Day>
                                                    <Day>30</Day>
                                                    <Day>31</Day>
                                                </Week>
                                            </Weeks>
                                            <Footer>
                                                <HolidayHeader>
                                                    *Public Holidays
                                                </HolidayHeader>
                                                <Holidays>
                                                    <Holiday>
                                                        <HolidayDate>
                                                            25 Dec
                                                        </HolidayDate>
                                                        <HolidayName>
                                                            Christmas
                                                        </HolidayName>
                                                    </Holiday>

                                                    <Holiday>
                                                        <HolidayDate>
                                                            1 Jan
                                                        </HolidayDate>
                                                        <HolidayName>
                                                            New Year
                                                        </HolidayName>
                                                    </Holiday>
                                                </Holidays>
                                            </Footer>
                                        </Month>
                                    }
                                </Calendar>
                            </Body>
                        }
                    </DatePicker>
                    { showPicker &&
                        <Backdrop onClick={togglePicker} />
                    }
                </DatePickerWrap>
            </SearchWidget>
        </div>
    );
}

export default App;
