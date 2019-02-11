import { FallbackFunctional, FallbackComp } from '../Fallback';
import { shallow } from 'enzyme';

describe('Fallback H.O.F.', () => {
  it('returns a loading component when loading', () => {
    const props = { loading: true };
    const LoadingComponent = jest.fn();
    const Component = jest.fn();

    const FallbackComponent = FallbackFunctional(LoadingComponent)(Component);

    FallbackComponent(props);

    expect(LoadingComponent.mock.calls).toHaveLength(1);
    expect(Component.mock.calls).toHaveLength(0);
  });

  it('returns a component when not loading', () => {
    const props = { loading: false };
    const LoadingComponent = jest.fn();
    const Component = jest.fn();

    const FallbackComponent = FallbackFunctional(LoadingComponent)(Component);

    FallbackComponent(props);

    expect(LoadingComponent.mock.calls).toHaveLength(0);
    expect(Component.mock.calls).toHaveLength(1);
  });

});

describe('Fallback H.O.C.', () => {
  it('returns a loading component when loading', () => {
    const props = { loading: true };
    const LoadingComponent = jest.fn();
    const Component = jest.fn();

    const FallbackComponent = FallbackComp(LoadingComponent)(Component);

    const wrapper = shallow(FallbackComponent(props));

    expect(LoadingComponent.mock.calls).toHaveLength(1);
    expect(Component.mock.calls).toHaveLength(0);
  });

  it('returns a component when not loading', () => {
    const props = { loading: false };
    const LoadingComponent = jest.fn();
    const Component = jest.fn();

    const FallbackComponent = FallbackComp(LoadingComponent)(Component);

    const wrapper = shallow(FallbackComponent(props));

    expect(LoadingComponent.mock.calls).toHaveLength(0);
    expect(Component.mock.calls).toHaveLength(1);
  });

});
