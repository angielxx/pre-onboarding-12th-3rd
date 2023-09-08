# 원티드 프리온보딩 3주차 - 한국임상정보 검색 영역 클론 코딩

## 📚 과제

### 한국임상정보 웹사이트의 검색영역 클론 코딩

#### 과제1. 검색창 구현

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

#### 과제2. 검색어 추천 기능 구현

- 사용자의 입력값에 따른 추천 검색어 제공
- API 호출 횟수를 줄이는 전략 수립 및 실행

#### 과제3. 캐싱 기능 구현

- API 호출별로 로컬 캐싱 구현
- 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)

---

## 사용한 기술 스택

<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/Zustand-F3DF49?style=flat-square&logo=zustand&logoColor=white"/>
<img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=Styled components&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>

</br>

---

## 🎬 페이지 미리보기 & 구현영상

구현영상은 배포 링크로 대체합니다.
https://pre-onboarding-12th-3rd.vercel.app/

### 동작 화면

---

### 💭 설계 방향

1. 코드의 가독성 및 재사용성

   - 스토어를 기능에 따라 분리하여 사용
   - 재사용 가능한 기능(debounce, fetch)을 커스텀 훅으로 정의

2. 성능 최적화

   - 검색창 입력값에 debounce를 적용하여 API 호출 횟수 최적화
   - API 호출의 결과를 로컬 스토리지에 캐싱하여 재사용

---

## 🛠️ 구현 설명

### 1. 검색창

### 2. 추천 검색어 제공

- 어떠한 값에 대해 특정 시간이 지난 후 변화를 감지하는 debounce 기능을 커스텀 훅으로 분리했습니다.

```javascript
import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

- 검색어에 대한 API 호출을 담당하는 커스텀 훅 useSearchQuery를 정의했습니다.
- 사용자의 검색어에 debounce를 적용하여 API 호출 횟수를 최적화했습니다.
- 검색어에 대한 API 호출을 하기 전 'cache hit'인 경우 캐시된 데이터를 사용하고, 'cache miss'인 경우 API를 호출하도록 했습니다.

```javascript
export const useSearchQuery = () => {
  const { setCache, findCache } = useCacheStore(state => state);

  const { keyword, isKeyDown } = useKeywordStore(state => state);

  const { setIsLoading, setData } = useFetchStore(state => state);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const fetchData = async (text: string) => {
      if (isKeyDown) return;

      try {
        setIsLoading(true);
        const { data } = await searchByKeyword(text);
        setData(data);
        setCache(text, data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isKeyDown) return;
    if (keyword === '') return;

    const cacheResult = findCache(keyword);

    if (cacheResult) {
      // 'cache hit'
      setData(cacheResult);
    } else {
      // 'cache miss'
      fetchData(debouncedKeyword);
    }
  }, [isKeyDown, keyword, debouncedKeyword]);

  return;
};
```

### 3. API 결과 캐싱 기능

- zustand의 persist middleware를 사용하여 local storage에 저장했습니다.
- 캐싱 관련한 로직만 담당하는 store인 cacheStore를 분리하여 작성했습니다.
- expire time의 기본값을 상수화하여 명시적으로 표현했습니다.
- expirre time를 인자로 받아 그 값에 따라 캐시 기한을 저장했습니다.

```javascript
export const DEFAULT_EXPIRE_TIME = 1000 * 60 * 60;

const useCacheStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        cache: {},

        setCache: (key, data, expireTime = DEFAULT_EXPIRE_TIME): void => {
          const due = Date.now() + expireTime;
          set(state => ({ cache: { ...state.cache, [key]: { data, due } } }));
        },

        findCache: key => {
          const cacheData = get().cache[key];
          if (cacheData) {
            const hasExpired = cacheData.due < Date.now();
            if (hasExpired) return undefined;
            return cacheData.data;
          } else {
            return undefined;
          }
        },
      }),
      { name: 'cacheStore' },
    ),
  ),
);
```

```javascript

```
