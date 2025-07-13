import { ReactSortable } from "react-sortablejs";
import { useState } from "react";

function getNestableItems(count: number) {
  return Array(count).fill({ id: 0 }).map((item, idx) => item.id + idx + 1)
}

const ListMovable = ({ item }: { item: number }) => {
  return (
    <div className="card cursor-grab px-6 py-3 border border-gray-200 dark:border-gray-700">Item {item}</div>
  )
}

const ListMovable2 = ({ item, classname }: { item: number, classname: string }) => {
  return (
    <div className={`${item === 2 ? `${classname} bg-danger text-white font-bold` : ""} card cursor-grab px-6 py-3 border border-gray-200 dark:border-gray-700`}>Item {item}</div>
  )
}

const SharedList2 = ({ item }: { item: number }) => {
  return (
    <div className="card cursor-grab px-6 py-3 border border-gray-200 dark:border-gray-700 tinted">Item {item}</div>
  )
}

const HandleWithIconList = ({ item }: { item: number }) => {
  return (
    <div className="card cursor-grab px-6 py-3 border border-gray-200 dark:border-gray-700"><i className="mgc_move_line handle"></i>&nbsp;&nbsp;Item {item}</div>
  )
}

const GridItem = ({ item }: { item: number }) => {
  return (
    <div className="w-24 h-24 flex items-center justify-center text-slate-900 dark:text-slate-200 rounded border shadow border-gray-200 dark:border-gray-700">Item {item}</div>
  )
}

const SimpleList = () => {
  const [items, setItems] = useState(() => getNestableItems(6))

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Simple list example</h4>
        </div>
      </div>
      <div className="p-6">

        <ReactSortable className="flex flex-col gap-3" id="example1" easing='ease' list={items} setList={setItems}>
          {(items || []).map((item, idx) => (
            <ListMovable item={Number(item)} key={idx} />
          ))}
        </ReactSortable>

      </div>
    </div>
  )
}

const SharedList = () => {
  const [items1, setItems1] = useState(() => getNestableItems(6))

  const [items2, setItems2] = useState(() => getNestableItems(6))

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Shared lists</h4>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-5">
          <ReactSortable group="teamList" className="flex flex-col gap-3" easing='ease' list={items1} setList={setItems1}>
            {(items1 || []).map((item, idx) => (
              <ListMovable key={idx} item={Number(item)} />
            ))}
          </ReactSortable>

          <ReactSortable group="teamList" className="flex flex-col gap-3" easing='ease' list={items2} setList={setItems2}>
            {(items2 || []).map((item, idx) => (
              <SharedList2 key={idx} item={Number(item)} />
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  )
}

const CloningList = () => {
  const [items1, setItems1] = useState(() => getNestableItems(6))

  const [items2, setItems2] = useState(() => getNestableItems(6))

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Cloning</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 mb-4">Try dragging from one list to another. The item you drag will be cloned and the clone will stay in the original list.</p>
        <div className="grid md:grid-cols-2 gap-5">
          <ReactSortable
            className="flex flex-col gap-3"
            list={items1}
            setList={setItems1}
            group={{
              name: "grouping",
              pull: "clone",
              put: true
            }}
            sort={false}
          >
            {(items1 || []).map((item, idx) => (
              <ListMovable key={idx} item={Number(item)} />
            ))}
          </ReactSortable>
          <ReactSortable
            group={{
              name: "grouping",
              pull: "clone",
              put: true
            }}
            className="flex flex-col gap-3"
            list={items2}
            setList={setItems2}
            ort={true}
          >

            {(items2 || []).map((item, idx) => (
              <ListMovable key={idx} item={Number(item)} />
            ))}

          </ReactSortable>

        </div>
      </div>
    </div>
  )
}

const DisableSorting = () => {
  const [items1, setItems1] = useState(() => getNestableItems(6))

  const [items2, setItems2] = useState(() => getNestableItems(6))

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Disabling Sorting</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 mb-4">Try sorting the list on the left. It is not possible because it has it's <code>sort</code> option set to false. However, you can still drag from the list on the left to the list on the right.</p>
        <div className="grid md:grid-cols-2 gap-5">

          <ReactSortable group="teamList" className="flex flex-col gap-3" easing='ease' list={items1} setList={setItems1}>
            {(items1 || []).map((item, idx) => (
              <ListMovable key={idx} item={Number(item)} />
            ))}
          </ReactSortable>

          <ReactSortable group="teamList" disabled className="flex flex-col gap-3" easing='ease' list={items2} setList={setItems2}>
            {(items2 || []).map((item, idx) => (
              <SharedList2 key={idx} item={Number(item)} />
            ))}
          </ReactSortable>

        </div>
      </div>
    </div>
  )
}

const HandleWithIconSorting = () => {
  const [items1, setItems1] = useState(() => getNestableItems(6))
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Handle With Icon</h4>
        </div>
      </div>
      <div className="p-6">
        <ReactSortable easing='ease' handle='.mgc_move_line' list={items1} setList={setItems1} id="example5" className="flex flex-col gap-3">
          {(items1 || []).map((item, idx) => (
            <HandleWithIconList key={idx} item={Number(item)} />
          ))}
        </ReactSortable>
      </div>
    </div>
  )
}

const FilterList = () => {
  const [items1, setItems1] = useState(() => getNestableItems(6))

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Filter</h4>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 mb-4">Try dragging the item with a red background. It cannot be done, because that item is filtered out using the <code>filter</code> option.</p>

        <ReactSortable className="flex flex-col gap-3" filter={".static"} id="example1" easing='ease' list={items1} setList={setItems1}>
          {(items1 || []).map((item, idx) => (
            <ListMovable2 item={Number(item)} key={idx} classname={"static"} />
          ))}
        </ReactSortable>

      </div>
    </div>
  )
}

const GridList = () => {
  const [items1, setItems1] = useState(() => getNestableItems(20))
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Grid Example</h4>
        </div>
      </div>
      <div className="p-6">

        <ReactSortable easing='ease' list={items1} setList={setItems1} id="example5" className="flex flex-wrap gap-4">
          {(items1 || []).map((item, idx) => (
            <GridItem key={idx} item={Number(item)} />
          ))}
        </ReactSortable>

      </div>
    </div>
  )
}

const NestedSortable = () => {

  const [blocks, setBlocks] = useState([
    {
      id: 1,
      content: "item 1",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 2,
          content: "item 2",
          width: 3,
          type: "text",
          parent_id: 1
        },
        {
          id: 3,
          content: "item 3",
          width: 3,
          type: "text",
          parent_id: 1
        }
      ]
    },
    {
      id: 4,
      content: "item 2",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 5,
          content: "item 5",
          width: 3,
          parent_id: 2,
          type: "container",
          children: [
            { id: 8, content: "item 8", width: 6, type: "text", parent_id: 5 },
            { id: 9, content: "item 9", width: 6, type: "text", parent_id: 5 }
          ]
        },
        {
          id: 6,
          content: "item 6",
          width: 2,
          type: "text",
          parent_id: 2
        },
        {
          id: 7,
          content: "item 7",
          width: 2,
          type: "text",
          parent_id: 2
        }
      ]
    }
  ]);

  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "shared"
  };

  function Container({ block, blockIndex, setBlocks }: any) {
    return (
      <>
        <ReactSortable
          key={block.id}
          list={block.children}
          setList={(currentList) => {
            // setBlocks((sourceList) => {
            //   const tempList = [...sourceList];
            //   const _blockIndex = [...blockIndex];
            //   const lastIndex = _blockIndex.pop();
            //   const lastArr = _blockIndex.reduce(
            //     (arr, i) => arr[i]["children"],
            //     tempList
            //   );
            //   console.log(lastIndex);
            //   lastArr[lastIndex]["children"] = currentList;
            //   return tempList;
            // });
          }}
          {...sortableOptions}
        >
          {block.children &&
            (block.children || []).map((childBlock: any, index: number) => {
              return (
                <BlockWrapper
                  key={childBlock.id}
                  block={childBlock}
                  blockIndex={[...blockIndex, index]}
                  setBlocks={setBlocks}
                />
              );
            })}
        </ReactSortable>
      </>
    )
  }


  function BlockWrapper({ block, blockIndex, setBlocks }: any) {
    if (!block) return null;
    if (block.type === "container") {
      return (
        <div className="card cursor-grab px-6 py-3 border border-gray-200 dark:border-gray-700 nested-1">
          container: {block.content}
          <Container
            block={block}
            setBlocks={setBlocks}
            blockIndex={blockIndex}
          />
        </div>
      );
    }
    else {
      return (
        <div className="card cursor-grab px-6 py-3 border border-gray-200 dark:border-gray-700 nested-1">
          text: {block.content}
        </div>
      );
    }
  }


  return (

    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Nested Sortables Example</h4>
        </div>
      </div>
      <div className="p-6">

        <ReactSortable list={blocks} setList={setBlocks} {...sortableOptions}>
          {(blocks || []).map((block, blockIndex) => (
            <BlockWrapper
              key={block.id}
              block={block}
              blockIndex={[blockIndex]}
              setBlocks={setBlocks}
            />
          ))}
        </ReactSortable>
      </div>
    </div>
  )
}

const NestableList = () => {
  return (
    <div className="flex flex-col gap-6">
      <SimpleList />
      <SharedList />
      <CloningList />
      <DisableSorting />
      <HandleWithIconSorting />
      <FilterList />
      <GridList />
      <NestedSortable />
    </div>
  )
};

export default NestableList