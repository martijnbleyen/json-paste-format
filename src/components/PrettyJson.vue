<script setup lang="ts">
    import { ref } from "vue";
    import JsonViewer from "vue-json-viewer";
    import { useDebounce } from "../helpers/useDebounce";

    const uglyJson = ref("");
    const jsonData = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");
    const showJson = ref(false);

    const pasteHandler = (e: ClipboardEvent) => {
        const str = e.clipboardData?.getData("text") || "";
        try {
            const clean_json = JSON.parse(str);
            jsonData.value = clean_json;
            showJson.value = true;
            console.log(navigator.clipboard);
            const json_text = JSON.stringify(clean_json, null, 4);
            e.preventDefault();
            uglyJson.value = "";
            errorMessage.value = "";
            // navigator.clipboard.writeText(json_text).then(() => {
            //     showSucessMessage("Formatted Json copied to clipboard!");
            // });
            
            var textArea = document.createElement("textarea");
            textArea.value = json_text;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successful" : "unsuccessful";
                if(successful){
                    showSucessMessage("Formatted Json copied to clipboard!");
                }
            } catch (err) {
                console.error("Fallback: Oops, unable to copy", err);
            }

            document.body.removeChild(textArea);

        } catch (error: any) {
            errorMessage.value = error.message;
            showJson.value = false;
        }
    };

    const showSucessMessage = (msg: string) => {
        successMessage.value = msg;
        useDebounce(() => {
            successMessage.value = "";
        }, 3000);
    };
</script>

<template>
    <div class="flex flex-col h-screen code-mirrors">
        <div class="h-[50px] border-b border-solid border-blue-300 relative">
            <img src="../assets/logo.svg" alt="logo JSON paste" class="absolute h-6 right-4 top-1/2 -translate-y-1/2" />
            <input autofocus type="text" @paste="pasteHandler" v-model="uglyJson" placeholder="Paste your unformatted json here..." class="w-full h-full focus:outline-0 p-4 font-mono text-sm text-[#002169] bg-blue-100 pr-[150px]" />
        </div>
        <div class="flex-1 overflow-hidden overflow-y-auto">
            <json-viewer v-if="showJson" :expand-depth="7" :copyable="true" :value="jsonData"></json-viewer>
        </div>
    </div>
    <div v-if="errorMessage" class="absolute left-0 right-0 font-medium text-center top-[50px] w-full p-4 border-red-500 border-dashed bg-red-100/60 text-red-600 border-b">
        {{ errorMessage }}
    </div>

    <div v-if="successMessage" @click="successMessage = ''" class="absolute left-0 right-0 font-medium text-center top-[50px] w-full p-4 border-green-500 border-dashed bg-green-100/40 text-green-600 border-b">
        {{ successMessage }}
    </div>
</template>

<style>
    .jv-container .jv-code {
        padding: 1rem;
    }
</style>
