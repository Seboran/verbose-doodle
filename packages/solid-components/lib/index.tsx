import {
  Component,
  For,
  Switch,
  Match,
  ResourceSource,
  Show,
  createResource,
} from 'solid-js'

export function createModelComponent<T>(): Component<T> {
  return (props) => {
    const keys = Object.entries(props)
    return (
      <For each={keys}>
        {([key, value]) => (
          <Switch
            fallback={
              <div>
                <span>{key}</span>
                <span>{props[key]}</span>
              </div>
            }
          >
            <Match when={typeof value === 'function'}>
              <button onClick={value}>{key}</button>
            </Match>
            <Match when={typeof value === 'string'}>
              <div>
                {key} {value}
              </div>
            </Match>
          </Switch>
        )}
      </For>
    )
  }
}

export function createResourceComponent<T>(
  fetcher: () => Promise<T>,
  sourceSignal: ResourceSource<unknown>,
): Component {
  const [data] = createResource(sourceSignal, fetcher)
  const ActualResourceComponent = createModelComponent<T>()
  return () => (
    <Show when={!data.loading} fallback={<div>Loading</div>}>
      <ActualResourceComponent {...data()} />
    </Show>
  )
}
