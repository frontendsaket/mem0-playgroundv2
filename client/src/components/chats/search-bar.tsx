import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronDown } from "lucide-react";
import { llm_models } from "@/utils/info";
import ChatContext from "@/context/ChatContext";

const SearchBar = () => {
  const {selectedModel, selectedProvider, setSelectedModel, setSelectedProvider} = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSelection = (provider: string, model: string) => {
    setSelectedModel(model);
    setSelectedProvider(provider);
    setIsOpen(false);
  };

  const filteredModels = (models: string[]) => {
    return models.filter((model) =>
      model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const openAIModels = filteredModels(llm_models.OpenAI);
  const groqModels = filteredModels(llm_models.Groq);
  const togetherModels = filteredModels(llm_models.Together);

  return (
    <div className="relative w-64">
      <Button
        onClick={toggleMenu}
        variant="outline"
        className="w-full justify-between"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>
          {selectedModel ? `${selectedProvider}: ${selectedModel}` : "Search Menu"}
        </span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-md border bg-popover p-4 shadow-md">
          <Input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <ScrollArea className="h-72">
            {openAIModels.length > 0 && (
              <>
                <h1 className="text-[12px] font-semibold text-gray-500">OpenAI</h1>
                <ul className="space-y-1">
                  {openAIModels.map((item, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        selectedModel === item && selectedProvider === "OpenAI"
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                      onClick={() => handleSelection("OpenAI", item)}
                    >
                      {selectedModel === item && selectedProvider === "OpenAI" && (
                        <Check className="inline mr-2 h-4 w-4" />
                      )}
                      OpenAI: {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {groqModels.length > 0 && (
              <>
                <h1 className="text-[12px] font-semibold text-gray-500">Groq</h1>
                <ul className="space-y-1">
                  {groqModels.map((item, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        selectedModel === item && selectedProvider === "Groq"
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                      onClick={() => handleSelection("Groq", item)}
                    >
                      {selectedModel === item && selectedProvider === "Groq" && (
                        <Check className="inline mr-2 h-4 w-4" />
                      )}
                      Groq: {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {togetherModels.length > 0 && (
              <>
                <h1 className="text-[12px] font-semibold text-gray-500">
                  Together
                </h1>
                <ul className="space-y-1">
                  {togetherModels.map((item, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        selectedModel === item && selectedProvider === "Together"
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                      onClick={() => handleSelection("Together", item)}
                    >
                      {selectedModel === item && selectedProvider === "Together" && (
                        <Check className="inline mr-2 h-4 w-4" />
                      )}
                      Together: {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
