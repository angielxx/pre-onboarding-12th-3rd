# 원티드 프리온보딩 2주차 - 레포지토리 이슈 목록 확인

## 📚 과제

### Facebook의 React 레파지토리의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축

#### 과제1. 이슈 목록 화면

- 이슈 목록 가져오기 API 활용
- open 상태의 이슈 중 코멘트가 많은 순으로 정렬
- 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
- 다섯번째 셀마다 광고 이미지 출력
- 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)

#### 과제2. 이슈 상세 화면

- 이슈의 상세 내용 표시
- ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시

#### 과제3. 공통 헤더

- 두 페이지는 공통 헤더를 공유합니다.
- 헤더에는 Organization Name / Repository Name이 표시됩니다.

---

## ⚒️ 사용한 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/Octokit-2F93E0?style=flat-square&logo=Octopus-Deploy&logoColor=white"/>
</br>

---

## 🎬 데모 영상 (배포)

- 링크로 대체합니다.
  https://pre-onboarding-12th-2nd.vercel.app/

---

## 💡 설계 및 구현 설명

### 1. Context API를 사용하여 전역 데이터 관리

IssueList와 관련한 데이터와 동작들을 Provider에서 제공하여 여러 컴포넌트에서 같은 데이터를 공유하고 쉽게 조작할 수 있도록 했습니다. state, dispatch로 나누어 context를 각 기능에 따라 분리하여 구현하여 상태 변화에 따른 Provider의 재렌더링을 최소화할 수 있도록 했습니다.

```javascript
interface StateType {
  issueList: PageType[];
  page: number;
  hasNextPage: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface DispatchType {
  fetchIssueByPage: (page: number) => void;
  addPage: () => void;
  setPrevPageIsLoading: (value: boolean) => void;
  setPrevPageError: (error: Error) => void;
}

export const IssueListStateContext = (createContext < StateType) | (null > null);
export const IssueListDispatchContext = (createContext < DispatchType) | (null > null);
```

Provider에는 IssueList 데이터와 hasNextPage, Loading, Error의 상태를 저장하여 다음 페이지를 불러오는 동작에 대한 조건을 제한할 수 있도록 했습니다.

```javascript
const IssueListProvider = ({ children }: { children: ReactNode }) => {
   const [issueList, setIssueList] = useState<PageType[]>([]);
   const [page, setPage] = useState<number>(1);
   const [hasNextPage, setHasNextPage] = useState(true);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<Error | null>(null);

   //...
};
```

페이지 별로 불러오는 fetch 함수의 경우, Provider에서는 단순 요청만 하고 Fetcher에서 try-catch문을 작성하여 각 페이지별로 에러 캐치를 수행할 수 있도록 했습니다.

```javascript
async function fetchIssueByPage(pageNum: number) {
  const data = await getIssuesPerPage(pageNum);
  const newPage = refineIssuesList(data);

  setIssueList(prev => {
    if (!prev.some(item => item.page === pageNum)) {
      return [...prev, { page: pageNum, data: newPage }];
    } else {
      return prev;
    }
  });
  setHasNextPage(!!data.length);
}
```

### 2. API 동작을 페이지 단위로 처리 - ApiErrorBoundary

#### 각 페이지의 구조 설계

API 호출과 같은 비동기 통신에 대한 로딩과 에러 상태, 데이터를 효율적으로 처리하고 사용자에게 적절한 화면과 가이드를 제공하는 것이 주요 목표였습니다. suspense와 error boundary를 사용하기로 결정하고, suspense의 경우 promise를 반환해주는 전역 상태 라이브러리를 사용해야하기 때문에 Context API를 사용하는 개발 환경에 맞춰 fetch 컴포넌트로 suspense를 대체하여 사용했습니다.

- Error Boundary를 사용하여 API 호출에 대한 에러를 한 곳에서 선언적으로 처리
- suspense를 대체할 수 있는 fetcher 컴포넌트를 사용하여 API 호출 상태에 대한 책임을 위임

무한 스크롤에 필요한 데이터를 받아오는 과정에서 페이지 단위로 데이터를 가져오기 때문에 페이지 단위로 로딩 상태와 에러를 처리할 수 있도록 설계했습니다. 이를 위해 한 페이지를 구성하는 컴포넌트의 구조를 아래와 같이 설정했습니다.

```javascript
<ApiErrorBoundary> // 단일 페이지의 API 동작 중 발생한 에러를 처리
  <IssuePageFetcher> // 단일 페이지의 API 호출을 담당
    <IssueListPerPageContainer> // 각 페이지의 데이터를 화면에 렌더링하는 UI
  <IssuePageFetcher />
<ApiErrorBoundary />
```

#### Fetcher

Fetcher는 각 페이지에 대한 API 호출상태를 담당하는 역할로, 각 페이지에 대한 데이터 호출 후 loading 상태에 따라 하위 컴포넌트를 반환합니다.

```javascript
const IssuePageFetcher = ({ children, page }: Props) => {
  //...

  seEffect(() => {
    if (hasNextPage && !prevPageIsLoading && !prevPageError) {
      fetchThisPage();
    }
  }, []);

  if (thisPageError) {
    throw thisPageError;
  }

  if (thisPageIsLoading) {
    return <ApiLoader />;
  }

  return children;
};
```

Fetcher가 각 페이지에 대한 API 호출 상태를 관리하기 때문에 Fetcher에서 API 함수를 호출하고 try-catch, Loading 등을 처리했습니다.

```javascript
const IssuePageFetcher = ({ children, page }: Props) => {
  const fetchThisPage = async () => {
    try {
      setThisPageIsLoading(true);
      await fetchIssueByPage(page);
    } catch (err) {
      setThisPageError(err);
    } finally {
      setThisPageIsLoading(false);
    }
  };
};
```

#### ApiErrorBoundary

Fetcher에서 throw한 에러를 받아 에러에 따라 분기처리하여 ApiErrorBoundary에서 Fallback UI를 렌더하거나, 그럴 수 없는 경우 rethrow했습니다.Github API 공식문서를 참고하여 Github API 관련 에러만 ApiErrorBoundary에서 처리하고 그 외의 에러는 rethrow했습니다.

```javascript
class ApiErrorBoundary extends Component<Props, State> {
   //...

   // 에러를 캐치하고 분기처리
    public static getDerivedStateFromError(error: Error): State {
    if ([401, 403, 404].includes(error.code)) {
      return {
        shouldHandleError: false,
        shouldRethrow: true,
        error,
      };
    }
    return {
      shouldHandleError: true,
      shouldRethrow: false,
      error,
    };
  }

   // 분기처리한 결과에 따라 다른 값을 반환
  render() {
    const { error, shouldRethrow, shouldHandleError } = this.state;
    const { fallback, children } = this.props;

    if (shouldRethrow) {
      throw error;
    }

    // retry 할 수 있는 에러
    if (shouldHandleError && error) {
      return fallback({ error, reset: this.resetErrorBoundary });
    }

    if (!shouldHandleError) {
      return children;
    }
  }
}
```

### 3. 무한 스크롤 구현 방식

스크롤 이벤트를 사용하여 스크롤이 맨 아래에 왔는지에 대한 상태를 제공하는 커스텀 훅을 정의했습니다.

```javascript
import { useEffect, useState } from 'react';

export const useDetectScroll = () => {
  const [isEnd, setIsEnd] = useState(false);

  const detectIsEnd = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsEnd(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', detectIsEnd);
    return () => window.removeEventListener('scroll', detectIsEnd);
  }, []);

  return { isEnd, setIsEnd };
};
```

스크롤 이벤트를 최적화하기 위해 requestAnimationFrame을 활용하여 브라우저 렌더링에 최적화하여 스크롤 이벤트에 대한 콜백함수를 실행할 수 있도록 하는 toScrollFit 유틸 함수를 사용했습니다.

```javascript
type CallBackType = () => void;

export const toScrollFit = (callBack: CallBackType) => {
  let tick = false;

  return function trigger() {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(function task() {
      tick = false;
      return callBack();
    });
  };
};
```

```javascript
import { useEffect, useState } from 'react';

export const useDetectScroll = () => {
  const [isEnd, setIsEnd] = useState(false);

  const detectIsEnd = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsEnd(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toScrollFit(detectIsEnd));
    return () => window.removeEventListener('scroll', detectIsEnd);
  }, []);

  return { isEnd, setIsEnd };
};
```
