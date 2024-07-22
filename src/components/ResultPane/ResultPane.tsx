export type ResultTypes = Record<string, string[]>[]

type ResultPaneTypes = {
    results: ResultTypes
}

const ResultPane = ({results}:ResultPaneTypes) => {
  return (
    <>
      <section>
        <p className="text-lg font-bold text-white">Results</p>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-sm">Search Engine</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-sm">Result Number</th>
            </tr>
          </thead>
          <tbody>
            {
              results?.map((result) => {
                for(const [key, value] of Object.entries(result)) {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value.flat()}</td>
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default ResultPane
