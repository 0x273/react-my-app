import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; //useState라는 훅을 사용

function Article(props){
//  console.log('props', props, props.title, props.body);
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Header(props){
//  console.log('props', props, props.title); // REACT
  return <header>
    <h1><a href="/" onClick={(event)=>{ //event 객체(이벤트 상황을 제어할 수 있는 여러가지 기능이 있음)
      event.preventDefault(); //기본동작 방지, 클릭해도 페이지 reload 일어나지 않음
      props.onChangeMode(); //함수 호출
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
    <a id={t.id} href={'/read/'+t.id} onClick={event=>{ //a 태그에 id속성 부여함
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
      //event.target은 타겟을 유발시킨 태그를 가리킴, 여기서는 a태그에 해당, a태그가 가진 id값을 가져옴
      //Number()를 쓰는 이유: 태그의 속성에 들어가있던 애는 문자열임. 문자열을 숫자로 바꿔줘야한다.
}}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Create(props){
  return <article>
    <h2>Create</h2>
  <form onSubmit={event =>{
    event.preventDefault();
    const title = event.target.title.value; //여기서 targt은 form을 의미함.
    const body = event.target.body.value;
    props.onCreate(title, body);

  }}>
    <p><input type="text" name="title" placeholder='title'/></p>
    <p><textarea name="body" placeholder="body"></textarea></p>
    <p><input type="submit" value="Create"></input></p>
  </form>
  </article>
}

function Update(props){
  const [title, setTitle] = useState(props.title); // props값을 state로 바꿈
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
  <form onSubmit={event =>{
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    props.onUpdate(title, body);
  }}>
    {/* <p><input type="text" name="title" placeholder="title" value={props.title}/></p> */}
    {/* props.title을 useState(내부자가 사용하는 데이터에 해당)로 바꿔줘야한다, onChange도 사용해야함(리액트에서는 값을 입력할 때마다 onChange가 활성화됨)*/}
    <p><input type="text" name="title" placeholder="title" value={title} onChange={event =>{
      console.log(event.target.value);
      setTitle(event.target.value); // 변경된 값을 새로운 title로 바꿔줌. 값이 바뀔 때마다 바뀌어야하므로 state를 사용해서 바꿔준다.
    }}/></p>
    <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
      setBody(event.target.value);
    }}></textarea></p>
    <p><input type="submit" value="Update"></input></p>
  </form>
  </article> 
}

function App() {
  const [mode, setMode] = useState('WELCOME'); //초기값
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]); //array

  let content = null;
  let contextControl = null;

  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      // console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <li><a href={'/update/'+id} onClick={event=>{ // read일 때만 update 버튼이 나타나도록
      event.preventDefault();
      setMode('UPDATE');      
    }}>Update</a></li>
  }else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create> //별도 컴포넌트로 만듦
  }else if(mode === 'UPDATE'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      console.log(title, body);
      const newTopics = [...topics]
      const updatedTopic = {id: id, title:title, body:body}
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}
      ></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event =>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;